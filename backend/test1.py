from flask import Flask,request, url_for, redirect, render_template
import pandas as pd
import numpy as np
import pickle
from lightgbm import LGBMRegressor
import warnings
from flask_cors import CORS

app = Flask(__name__) 
CORS(app)

warnings.filterwarnings('ignore')

lgbmFile = 'LGBMRegressor.sav'
scalerFile = 'scaler.sav'

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

@app.route('/')
def template_deploy():
    return render_template('index.html')

@app.route('/predict',methods=['POST','GET'])
def predict():
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
    input23 = int(request.form['23'])
    input24 = int(request.form['24'])
    input25 = int(request.form['25'])
    input26 = int(request.form['26'])
    input27 = int(request.form['27'])
    input28 = int(request.form['28'])
    input29 = int(request.form['29'])
    input30 = int(request.form['30'])
    input31 = int(request.form['31'])
    input32 = int(request.form['32'])
    input33 = int(request.form['33'])
    input34 = int(request.form['34'])
    input35 = int(request.form['35'])

 
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
        "gender_F": [input23],
        "gender_M": [input24],
        "rcount_0": [input25],
        "rcount_1": [input26],
        "rcount_2": [input27],
        "rcount_3": [input28],
        "rcount_4": [input29],
        "rcount_5+": [input30],
        "facid_A": [input31],
        "facid_B": [input32],
        "facid_C": [input33],
        "facid_D": [input34],
        "facid_E": [input35]
    }


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



if __name__ == '__main__':
    app.run(debug=True)
