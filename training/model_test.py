import pickle
import pandas as pd
import numpy as np

# Load the model, encoder, and disease_freq from the pickle file
with open('./training/model/prediction.pkl', 'rb') as file:
    clf,ferver_encoder,cough_encoder,fatigue_encoder,breathing_encoder,blood_encoder,fat_encoder,gender_encoder,outcome_encoder,category_counts = pickle.load(file)

# Define the new data
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

# Create a DataFrame for the new data
testing_data = pd.DataFrame(data_for_outcome)

# Map 'Disease_freq' using the loaded 'disease_freq' dictionary
testing_data['Disease_freq'] = testing_data['Disease_freq'].map(
    category_counts)

# Apply label encoding consistently
testing_data['Fever'] = ferver_encoder.transform(testing_data['Fever'])
testing_data['Cough'] = cough_encoder.transform(testing_data['Cough'])
testing_data['Fatigue'] = fatigue_encoder.transform(testing_data['Fatigue'])
testing_data['Difficulty Breathing'] = breathing_encoder.transform(
    testing_data['Difficulty Breathing'])
testing_data['Gender'] = gender_encoder.transform(testing_data['Gender'])
testing_data['Blood Pressure'] = blood_encoder.transform(
    testing_data['Blood Pressure'])
testing_data['Cholesterol Level'] = fat_encoder.transform(
    testing_data['Cholesterol Level'])


res = clf.predict(testing_data)[0]
res_array = np.array([res])

outcome = outcome_encoder.inverse_transform(res_array)
print(outcome[0])


