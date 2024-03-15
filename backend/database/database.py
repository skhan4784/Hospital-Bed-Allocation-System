from pymongo import MongoClient

# Provide the MongoDB connection URI
uri = "mongodb+srv://miskhashosha:miskhashosha@hospitaldata.4uuvrtr.mongodb.net/Hospital?retryWrites=true&w=majority"

# Create a MongoClient object
client = MongoClient(uri)

# Access your database
db = client["Hospital"]  # Replace "Hospital" with your database name

# Define collections
patients_collection = db["patients"]
allocation_details_collection = db["allocation_details"]
waiting_list_collection = db["waiting_list"]
bed_details_collection = db["bed_details"]

# # Define a patient document
# patient = {
#     "patient_id": 1,
#     "name": "John Doe",
#     "age": 35,
#     "length_of_stay": 7
# }

# # Insert the patient document into the patients collection
# patients_collection.insert_one(patient)