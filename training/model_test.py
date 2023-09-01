import pickle
import pandas as pd
import numpy as np


with open('./training/model/prediction.pkl', 'rb') as file:
    loaded_model, encoder, disease_freq = pickle.load(file)

data_for_outcome = {
    'Fever': ['Yes'],
    'Cough': ['No'],
    'Fatigue': ['Yes'],
    'Difficulty Breathing': ['Yes'],
    'Age': [19],
    'Gender': ['Female'],
    'Blood Pressure': ['Low'],
    'Cholesterol Level': ['Normal'],
    'Disease_freq': ['Influenza']
}

testing_data = pd.DataFrame(data_for_outcome)

testing_data['Disease_freq'] = testing_data['Disease_freq'].map(disease_freq)
testing_data['Fever'] = encoder.fit_transform(testing_data['Fever'])
testing_data['Cough'] = encoder.fit_transform(testing_data['Cough'])
testing_data['Fatigue'] = encoder.fit_transform(testing_data['Fatigue'])
testing_data['Difficulty Breathing'] = encoder.fit_transform(
    testing_data['Difficulty Breathing'])
testing_data['Gender'] = encoder.fit_transform(testing_data['Gender'])
testing_data['Blood Pressure'] = encoder.fit_transform(
    testing_data['Blood Pressure'])
testing_data['Cholesterol Level'] = encoder.fit_transform(
    testing_data['Cholesterol Level'])

print(testing_data)


