import pandas as pd
import csv

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

# See : https://stackabuse.com/linear-regression-in-python-with-scikit-learn/

# Handle data treatment
def handle_data(dataset):
    # Prepare our dataset
    X = dataset[['Hours', 'Month']]
    y = dataset['Temp']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
    # Then train our algorithm
    regressor = LinearRegression()
    regressor.fit(X_train, y_train)
    return regressor

def writePrediction(regressor):
    # Retrieve request
    requestSet = pd.read_csv('request.csv')
    # Make prediction
    prediction = regressor.predict(requestSet)
    print(requestSet)
    print(prediction)
    # Write in file
    file = open('response.csv', 'w')
    writer = csv.writer(file)
    writer.writerow(prediction)

# app function
def app():
    # Retrieve our dataset
    dataset = pd.read_csv('thermo_historic.csv')
    # Handle data treatment
    regressor = handle_data(dataset)
    writePrediction(regressor)


# Main function
if __name__ == '__main__':
    app()
