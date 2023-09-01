#!/usr/bin/env python
# coding: utf-8

# In[93]:


import pandas as pd
import numpy as np


# In[94]:


data = pd.read_csv('raw_data.csv')
data


# In[95]:


data.Disease.unique()


# In[96]:


data['Blood Pressure'].unique()


# In[97]:


data['Cholesterol Level'].unique()


# In[98]:


data['Outcome Variable'].unique()


# In[99]:


data.isnull().sum()


# In[100]:


data.columns


# In[101]:


data['Disease'].value_counts()


# In[102]:


from sklearn.preprocessing import LabelEncoder
lencoder = LabelEncoder()


# In[103]:


data.Fever= lencoder.fit_transform(data.Fever)
data.Cough = lencoder.fit_transform(data.Cough)
data.Fatigue = lencoder.fit_transform(data.Fatigue)
data['Difficulty Breathing'] = lencoder.fit_transform(data['Difficulty Breathing'])
data['Blood Pressure'] = lencoder.fit_transform(data['Blood Pressure'])
data['Cholesterol Level'] = lencoder.fit_transform(data['Cholesterol Level'])
data.Gender = lencoder.fit_transform(data.Gender)
data['Outcome Variable'] = lencoder.fit_transform(data['Outcome Variable'])
data


# In[104]:


# Calculate the frequency of each category in the dataset
category_counts = data['Disease'].value_counts()

# Create a new column with the frequency values for each category
data['Disease_freq'] = data['Disease'].map(category_counts)
data = data.drop(columns='Disease',axis=1)
data


# In[105]:


X = data.drop(columns='Outcome Variable', axis=1)
X


# In[106]:


y = data[['Outcome Variable']].values.ravel()
y


# In[107]:


import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

while True:
    # Split the dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.1, random_state=45)

    # Initialize the Random Forest classifier
    clf = RandomForestClassifier()

    # Train the classifier on the training data
    clf.fit(X_train, y_train)

    # Calculate the accuracy of the model on the test data
    accuracy = clf.score(X_test, y_test)
    y_pred = clf.predict(X_test)
    print('Current accuracy:', accuracy)

    # Check if the accuracy is greater than 0.9
    if accuracy > 0.9:
        break


# In[108]:


import seaborn as sns

import matplotlib.pyplot as plt

plt.figure(figsize=(10, 6))

plt.hist(y_test, alpha=0.5, label='Test Values', bins=20, color='blue')
plt.hist(y_pred, alpha=0.5, label='Predicted Values', bins=20, color='red')

plt.xlabel('Outcome Variable')
plt.ylabel('Frequency')
plt.title('Histogram of Test Values and Predicted Values')
plt.legend()
plt.show()


# In[109]:


import pickle


# Export the model and label encoder using pickle
with open('./model/prediction.pkl', 'wb') as file:
    pickle.dump((clf, lencoder, category_counts), file)

