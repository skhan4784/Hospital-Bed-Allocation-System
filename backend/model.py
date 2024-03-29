import numpy as np
import pandas as pd
import pickle
from sklearn.model_selection import RandomizedSearchCV,GridSearchCV, train_test_split
from sklearn.neighbors import KNeighborsClassifier

data = pd.read_csv("backend\diabetes.csv")

X = data.drop("Outcome",axis=1)
y = data["Outcome"]
X_train,X_test,y_train,y_test =  train_test_split(X,y,test_size=0.2)

knn = KNeighborsClassifier()
knn.fit(X_train,y_train);

pickle.dump(knn, open("testing5.pkl", "wb"))

