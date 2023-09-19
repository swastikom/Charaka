from mongoengine import Document, EmbeddedDocument, EmbeddedDocumentField, IntField, StringField, ListField, EmailField, DateTimeField, ObjectIdField


class Item(EmbeddedDocument):
    Fever = StringField()
    Cough = StringField()
    Fatigue = StringField()
    Difficulty_Breathing = StringField()
    Age = IntField()
    Gender = StringField()
    Blood_Pressure = StringField()
    Cholesterol_Level = StringField()
    Disease_freq = StringField()
    outcome = StringField()
    _id = ObjectIdField()


class User(Document):
    email = EmailField(required=True)
    password = StringField()
    itemList = ListField(EmbeddedDocumentField(Item))
    otp = StringField()
    createdAt = DateTimeField()
    updatedAt = DateTimeField()
    meta = {
        'collection': 'users'
    }


