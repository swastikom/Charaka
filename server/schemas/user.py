from mongoengine import Document, EmbeddedDocument, EmbeddedDocumentField, IntField, StringField, ListField, EmailField


class Item(EmbeddedDocument):
    Fever: StringField()
    Cough: StringField()
    Fatigue: StringField()
    Difficulty_Breathing: StringField()
    Age: IntField()
    Gender: StringField()
    Blood_Pressure: StringField()
    Cholesterol_Level: StringField()
    Disease_freq: StringField()
    outcome: StringField()
    
class User(Document):
    name = StringField()
    email = EmailField()
    password = StringField()
    country = StringField()
    propertyList = ListField(EmbeddedDocumentField(Item))
    password_reset_otp = StringField()
    


