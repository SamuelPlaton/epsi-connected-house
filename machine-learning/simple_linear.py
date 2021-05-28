import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import csv

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn import metrics

# See : https://stackabuse.com/linear-regression-in-python-with-scikit-learn/

# Print informations about our datas
def print_data_informations(dataset):
    # Print shape of our datashape (25 rows of 2 columns)
    print(dataset.shape)
    # Get the first 5 rows of our dataset
    print(dataset.head())
    # Get informations about dataset (min, max, quarters...)
    print(dataset.describe())
    # Plot our datas into a 2D graph
    dataset.plot(x='Hours', y='Temp', style='o')
    plt.title('Value by hour')
    plt.xlabel('Hours')
    plt.ylabel('Values')
    plt.show()

# Prepare and format our datas
def prepare_data(dataset):
    X = dataset.iloc[:, :-1].values
    print('X')
    print(X)
    y = dataset.iloc[:, 1].values
    return train_test_split(X, y, test_size=0.2, random_state=0)

# Train our algorithm
def train_algorithm(X_train, y_train):
    regressor = LinearRegression()
    regressor.fit(X_train, y_train)
    return regressor

def writePrediction(regressor):
    # Retrieve request
    requestSet = pd.read_csv('request.csv')
    requestHour = requestSet.iloc[:, :-1].values
    requestMonth = requestSet.iloc[:, 1].values
    # Make prediction
    prediction = regressor.predict(requestHour)
    # Write in file
    file = open('response.csv', 'w')
    writer = csv.writer(file)
    writer.writerow(prediction)

# app function
def app():
    # Retrieve our dataset
    dataset = pd.read_csv('thermo_historic.csv')

    # Print our datas
    print_data_informations(dataset)
    # Retrieve prepared datas
    X_train, X_test, y_train, y_test = prepare_data(dataset)
    # Train algorithm
    regressor = train_algorithm(X_train, y_train)
    # Then write prediction
    writePrediction(regressor)


# Main function
if __name__ == '__main__':
    app()
