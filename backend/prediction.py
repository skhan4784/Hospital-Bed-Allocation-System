#loading the models
import pandas as pd
import numpy as np
import pickle
from lightgbm import LGBMRegressor
import warnings

warnings.filterwarnings('ignore')

lgbmFile = 'backend/LGBMRegressor.sav'
scalerFile = 'backend/scaler.sav'

lgbm = pickle.load(open(lgbmFile, 'rb'))
scaler = pickle.load(open(scalerFile, 'rb'))

# Data
data = {"dialysisrenalendstage": [0],
        "asthma": [0],
        "irondef": [0],
        "pneum": [0],
        "substancedependence": [0],
        "psychologicaldisordermajor": [0],
        "depress": [0],
        "psychother": [0],
        "fibrosisandother": [0],
        "malnutrition": [0],
        "hemo": [0],
        "hematocrit": [11.5],
        "neutrophils": [14.2],
        "sodium": [140.36],
        "glucose": [192.47],
        "bloodureanitro": [12],
        "creatinine": [1.39],
        "bmi": [30.43],
        "pulse": [96],
        "respiration": [6.5],
        "secondarydiagnosisnonicd9": [4],
        "numberofissues": [0],
        "gender_F": [1],
        "gender_M": [0],
        "rcount_0": [1],
        "rcount_1": [0],
        "rcount_2": [0],
        "rcount_3": [0],
        "rcount_4": [0],
        "rcount_5+": [0],
        "facid_A": [0],
        "facid_B": [1],
        "facid_C": [0],
        "facid_D": [0],
        "facid_E": [0]
    }

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

def MakePrediction(ScalingModel, RegressionModel, data):
  df = pd.DataFrame.from_dict(data)
  df["numberofissues"] = df[bin_cols].sum(axis=1)
  features = df[num_cols]
  features = ScalingModel.transform(features.values)
  df[num_cols] = features
  preds = np.round(RegressionModel.predict(df), 0)
  return int(preds[0])

print(MakePrediction(scaler, lgbm, data))

print("Model loaded successfully")

