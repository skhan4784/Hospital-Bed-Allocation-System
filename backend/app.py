from flask import Flask, request, jsonify, request, url_for, redirect, render_template
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import ObjectId
from datetime import datetime
import pandas as pd
import numpy as np
import pickle
from lightgbm import LGBMRegressor
import warnings

warnings.filterwarnings('ignore')

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
<<<<<<< HEAD
            # # Check if there are patients in the waiting list
            try:
                waiting_patients = mongo.db.waiting_list.find()

                if waiting_patients:
                    # Select the first patient in the waiting list
                    next_patient = waiting_patients[0]
                    
                    #next patient id
                    next_patient_id = next_patient["patient_id"]

                    # Find the patient by ID
                    patient = mongo.db.patients.find_one({"patient_id": next_patient_id})

                    # Allocate bed to the waiting patient
                    mongo.db.bed_details.update_one({"bed_number": allocated_bed["bed_number"]}, {"$set": {"is_occupied": True, "patient_id": next_patient_id}})

                    # Remove the patient from the waiting list
                    mongo.db.waiting_list.delete_one({"patient_id": next_patient_id})

                    #Add patient to allocation details
                    mongo.db.allocation_details.insert_one({
                        "patient_id": patient["patient_id"],
                        "arrival_date": next_patient["arrival_date"],
                        "allocation_date": datetime.now(),
                        "bed_number": allocated_bed["bed_number"],
                        "waiting_time": 0
                    })
                
                else:
                    # Free up the bed
                    mongo.db.bed_details.update_one({"patient_id": allocated_bed["patient_id"]}, {"$set": {"is_occupied": False, "patient_id": None}})
            except:
=======
            # Check if there are patients in the waiting list
            waiting_patients = mongo.db.waiting_list.find()

            if waiting_patients:
                # Select the first patient in the waiting list
                next_patient = waiting_patients[0]
                
                #next patient id
                next_patient_id = next_patient["patient_id"]

                # Find the patient by ID
                patient = mongo.db.patients.find_one({"patient_id": next_patient_id})

                # Allocate bed to the waiting patient
                mongo.db.bed_details.update_one({"bed_number": allocated_bed["bed_number"]}, {"$set": {"is_occupied": True, "patient_id": next_patient_id}})

                # Remove the patient from the waiting list
                mongo.db.waiting_list.delete_one({"patient_id": next_patient_id})

                #Add patient to allocation details
                mongo.db.allocation_details.insert_one({
                    "patient_id": patient["patient_id"],
                    "arrival_date": next_patient["arrival_date"],
                    "allocation_date": datetime.now(),
                    "bed_number": allocated_bed["bed_number"],
                    "waiting_time": 0
                })
            
            else:
>>>>>>> 4dd9a06b04403d46da03da1f4cae72a3076d7df5
                # Free up the bed
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
<<<<<<< HEAD
    
@app.route("/api/check_empty_beds")
def check_empty_beds():
    try:
        # Find all beds that are not occupied
        empty_beds = list(mongo.db.bed_details.find({'is_occupied': False}))
        # Prepare the response
        return jsonify(empty_beds)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/api/get_waiting_patients")
def get_waiting_patients():
    try:
        # Find all patients in the waiting list
        waiting_patients = list(mongo.db.waiting_list.find())
        # Prepare the response
        return jsonify(waiting_patients)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/allocate_bed")
def allocate_bed():
    try:
        # Find the first vacant bed
        vacant_bed = mongo.db.bed_details.find_one({'is_occupied': False})
        if vacant_bed:
            # Find the first patient in the waiting list
            waiting_patient = mongo.db.waiting_list.find_one({})
            if waiting_patient:
                # Allocate the bed to the waiting patient
                mongo.db.bed_details.update_one({"_id": vacant_bed["_id"]}, {"$set": {"is_occupied": True, "patient_id": waiting_patient["patient_id"]}})
                # Calculate waiting time (difference between current time and arrival time)
                arrival_date = waiting_patient["arrival_date"]
                waiting_time = (datetime.now() - arrival_date).total_seconds() / 60  # Convert waiting time to minutes
                # Update allocation details
                mongo.db.allocation_details.insert_one({
                    "patient_id": waiting_patient["patient_id"],
                    "arrival_date": arrival_date,
                    "allocation_date": datetime.now(),
                    "bed_number": vacant_bed["bed_number"],
                    "waiting_time": waiting_time
                })
                # Remove the patient from the waiting list
                mongo.db.waiting_list.delete_one({"patient_id": waiting_patient["patient_id"]})
                return jsonify({"message": "Bed allocated successfully to the waiting patient."}), 200
            else:
                return jsonify({"message": "No waiting patients available."}), 404
        else:
            return jsonify({"message": "No vacant beds available."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
@app.route('/api/predict',methods=['POST','GET'])
def predict():

    lgbmFile = 'backend/LGBMRegressor.sav'
    scalerFile = 'backend/scaler.sav'

    lgbm = pickle.load(open(lgbmFile, 'rb'))
    scaler = pickle.load(open(scalerFile, 'rb'))

    # Columns
    cat_cols = ['gender', 'rcount', 'facid']
    bin_cols = ["dialysisrenalendstage",
                "asthma",
                "irondef",
                "pneum",
                "substancedependence",
                "psychologicaldisordermajor",
                "depress",
                "psychother",
                "fibrosisandother",
                "malnutrition",
                "hemo"]
    num_cols = ["hematocrit",
                "neutrophils",
                "sodium",
                "glucose",
                "bloodureanitro",
                "creatinine",
                "bmi",
                "respiration"]

    input1 = int(request.form['1'])
    input2 = int(request.form['2'])
    input3 = int(request.form['3'])
    input4 = int(request.form['4'])
    input5 = int(request.form['5'])
    input6 = int(request.form['6'])
    input7 = int(request.form['7'])
    input8 = int(request.form['8'])
    input9 = int(request.form['9'])
    input10 = int(request.form['10'])
    input11 = int(request.form['11'])
    input12 = int(request.form['12'])
    input13 = int(request.form['13'])
    input14 = int(request.form['14'])
    input15 = int(request.form['15'])
    input16 = int(request.form['16'])
    input17 = int(request.form['17'])
    input18 = int(request.form['18'])
    input19 = int(request.form['19'])
    input20 = int(request.form['20'])
    input21 = int(request.form['21'])
    input22 = int(request.form['22'])
    gender_value = request.form['23']
    r_count_value = request.form['24']
    facid_value = request.form['25']

 
    # Data
    data = {"dialysisrenalendstage": [input1],
        "asthma": [input2],
        "irondef": [input3],
        "pneum": [input4],
        "substancedependence": [input5],
        "psychologicaldisordermajor": [input6],
        "depress": [input7],
        "psychother": [input8],
        "fibrosisandother": [input9],
        "malnutrition": [input10],
        "hemo": [input11],
        "hematocrit": [input12],
        "neutrophils": [input13],
        "sodium": [input14],
        "glucose": [input15],
        "bloodureanitro": [input16],
        "creatinine": [input17],
        "bmi": [input18],
        "pulse": [input19],
        "respiration": [input20],
        "secondarydiagnosisnonicd9": [input21],
        "numberofissues": [input22],
        "gender_F": 0,
        "gender_M": 0,
        "rcount_0": 0,
        "rcount_1": 0,
        "rcount_2": 0,
        "rcount_3": 0,
        "rcount_4": 0,
        "rcount_5+": 0,
        "facid_A": 0,
        "facid_B": 0,
        "facid_C": 0,
        "facid_D": 0,
        "facid_E": 0
    }

    if gender_value == "male":
        data["gender_M"] = 1
    else:
        data["gender_F"] = 1

    # Set rcount_* based on r_count_value
    if r_count_value == "0":
        data["rcount_0"] = 1
    elif r_count_value == "1":
        data["rcount_1"] = 1
    elif r_count_value == "2":
        data["rcount_2"] = 1
    elif r_count_value == "3":
        data["rcount_3"] = 1
    elif r_count_value == "4":
        data["rcount_4"] = 1
    else:
        data["rcount_5+"] = 1

    # Set facid_* based on facid_value
    if facid_value == "A":
        data["facid_A"] = 1
    elif facid_value == "B":
        data["facid_B"] = 1
    elif facid_value == "C":
        data["facid_C"] = 1
    elif facid_value == "D":
        data["facid_D"] = 1
    else:
        data["facid_E"] = 1

    def MakePrediction(ScalingModel, RegressionModel, data):
        df = pd.DataFrame.from_dict(data)
        df["numberofissues"] = df[bin_cols].sum(axis=1)
        features = df[num_cols]
        features = ScalingModel.transform(features.values)
        df[num_cols] = features
        preds = np.round(RegressionModel.predict(df), 0)
        return int(preds[0])
    
    output = MakePrediction(scaler, lgbm, data)

    return render_template('result.html',pred=f'Length of Stay: {output}')
=======
>>>>>>> 4dd9a06b04403d46da03da1f4cae72a3076d7df5

if __name__ == "__main__":
    app.run(debug=True)