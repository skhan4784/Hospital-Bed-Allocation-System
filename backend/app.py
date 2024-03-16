from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import ObjectId
from datetime import datetime

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb+srv://miskhashosha:miskhashosha@hospitaldata.4uuvrtr.mongodb.net/Hospital?retryWrites=true&w=majority"

mongo = PyMongo(app)

@app.route('/api/add_patient', methods=['POST'])
def add_patient():
    try:
        # Get patient data from request
        patient_data = request.json
        
        # Check if any bed is vacant
        vacant_bed = mongo.db.bed_details.find_one({"is_occupied": False})

        if vacant_bed:
            # Allocate the vacant bed to the patient
            mongo.db.bed_details.update_one({"_id": vacant_bed["_id"]}, {"$set": {"is_occupied": True, "patient_id": patient_data["patient_id"]}})
            # Calculate waiting time (0 because patient got bed immediately)
            waiting_time = 0
            # Update allocation details
            mongo.db.allocation_details.insert_one({
                "patient_id": patient_data["patient_id"],
                "arrival_date": datetime.now(),
                "allocation_date": datetime.now(),
                "bed_number": vacant_bed['bed_number'],
                "waiting_time": waiting_time
            })
        else:
            # Add patient to waiting list
            mongo.db.waiting_list.insert_one({
                "patient_id": patient_data["patient_id"],
                "arrival_date": datetime.now(),
                "waiting_time": 0
            })

        # Add patient to patients collection
        mongo.db.patients.insert_one(patient_data)
        
        return jsonify({'message': 'Patient added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/get_patients', methods=['GET'])
def get_patients():
    try:
        # Retrieve all patients from the MongoDB collection
        patients = list(mongo.db.patients.find())
        # Convert ObjectId to string for JSON serialization
        for patient in patients:
            patient['_id'] = str(patient['_id'])
        return jsonify(patients), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/check_patient_id/<int:patient_id>', methods=['GET'])
def check_patient_id(patient_id):
    # Check if the patient ID exists in the patients collection
    patient = mongo.db.patients.find_one({"patient_id": patient_id})
    is_unique = patient is None

    return jsonify({"isUnique": is_unique})

@app.route('/api/add_bed', methods=['POST'])
def add_bed():
    # Get the bed number from the request body
    bed_number = request.json.get('bed_number')

    # Add the bed to the bed_details collection
    mongo.db.bed_details.insert_one({
        "bed_number": bed_number,
        "is_occupied": False,
        "patient_id": None
    })

    return jsonify({"message": "Bed added successfully"})

@app.route('/api/bed_details', methods=['GET'])
def get_bed_details():
    # Fetch all bed details from the bed_details collection
    bed_details = list(mongo.db.bed_details.find({}, {"_id": 0}))  # Exclude _id field
    return jsonify(bed_details)

@app.route('/api/delete_patient/<string:patient_id>', methods=['DELETE'])
def delete_patient(patient_id):
    try:
        # Convert patient_id string to ObjectId
        patient_oid = ObjectId(patient_id)
        
        # Find the patient by ID
        patient = mongo.db.patients.find_one({"_id": patient_oid})

        # Get the patient_id from the patient document
        patient_id_to_delete = patient['patient_id']
        
        if not patient:
            return jsonify({"error": "Patient not found"}), 404

        # Check if patient has an allocated bed
        allocated_bed = mongo.db.bed_details.find_one({"patient_id": patient_id_to_delete})
        
        if allocated_bed:
            # Check if there are patients in the waiting list
            waiting_patients = mongo.db.waiting_list.find()

            # if waiting_patients.count() > 0:
            #     # Select the first patient in the waiting list
            #     next_patient = waiting_patients[0]

            #     # Allocate bed to the waiting patient
            #     mongo.db.bed_details.update_one({"bed_number": next_patient["bed_number"]}, {"$set": {"is_occupied": True, "patient_id": next_patient["patient_id"]}})

            #     # Remove the patient from the waiting list
            #     mongo.db.waiting_list.delete_one({"_id": next_patient["_id"]})
            
            # else:
            #     # Free up the bed
            mongo.db.bed_details.update_one({"patient_id": allocated_bed["patient_id"]}, {"$set": {"is_occupied": False, "patient_id": None}})
            # Remove the allocation details
            mongo.db.allocation_details.delete_one({"patient_id": patient_id_to_delete})
        else:
            # Remove the patient from waiting list
            mongo.db.waiting_list.delete_one({"patient_id": patient_id_to_delete})
        
        

        # Delete the patient from the patients collection
        mongo.db.patients.delete_one({"_id": patient_oid})
        
        return jsonify({"message": "Patient deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/waitlist', methods=['GET'])
def get_waitlist():
    try:
        waitlist = list(mongo.db.waiting_list.find({}, {"_id": 0}))
        return jsonify(waitlist), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/get_allocation_details', methods=['GET'])
def get_allocation_details():
    try:
        # Fetch allocation details from the database
        allocation_details = list(mongo.db.allocation_details.find({}, {'_id': 0}))
        return jsonify(allocation_details), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
