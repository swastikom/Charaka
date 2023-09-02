from fastapi import APIRouter, Depends, HTTPException
from enum import Enum
from model.outcome import Item
import pandas as pd
import pickle
import numpy as np

router = APIRouter()


class Tags(Enum):
    predict_result = "Predict Outcome"


@router.post("/predict_outcome", tags=[Tags.predict_result])
def prediction(input_data: Item):
    
    with open('../training/model/prediction.pkl', 'rb') as file:
        clf, ferver_encoder, cough_encoder, fatigue_encoder, breathing_encoder, blood_encoder, fat_encoder, gender_encoder, outcome_encoder, category_counts = pickle.load(file)
    
    data_for_outcome = {
        'Fever': [input_data.Fever],
        'Cough': [input_data.Cough],
        'Fatigue': [input_data.Fatigue],
        'Difficulty Breathing': [input_data.Difficulty_Breathing],
        'Age': [input_data.Age],
        'Gender': [input_data.Gender],
        'Blood Pressure': [input_data.Blood_Pressure],
        'Cholesterol Level': [input_data.Cholesterol_Level],
        'Disease_freq': [input_data.Disease_freq]
    }
    
    data_feed_model = pd.DataFrame(data_for_outcome)
    
    data_feed_model = pd.DataFrame(data_for_outcome)


    # Map 'Disease_freq' using the loaded 'disease_freq' dictionary
    data_feed_model['Disease_freq'] = data_feed_model['Disease_freq'].map(
    category_counts)

    # Apply label encoding consistently
    data_feed_model['Fever'] = ferver_encoder.transform(data_feed_model['Fever'])
    data_feed_model['Cough'] = cough_encoder.transform(data_feed_model['Cough'])
    data_feed_model['Fatigue'] = fatigue_encoder.transform(data_feed_model['Fatigue'])
    data_feed_model['Difficulty Breathing'] = breathing_encoder.transform(
    data_feed_model['Difficulty Breathing'])
    data_feed_model['Gender'] = gender_encoder.transform(data_feed_model['Gender'])
    data_feed_model['Blood Pressure'] = blood_encoder.transform(
        data_feed_model['Blood Pressure'])
    data_feed_model['Cholesterol Level'] = fat_encoder.transform(
        data_feed_model['Cholesterol Level'])
    
    res = clf.predict(data_feed_model)[0]


    res_array = np.array([res])

    outcome = outcome_encoder.inverse_transform(res_array)
    
    return{
        "Outcome":outcome[0]
    }
    
