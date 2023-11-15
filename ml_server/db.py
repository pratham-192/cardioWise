from pymongo import MongoClient

conn = MongoClient("mongodb+srv://admin:abcdefgh@cluster0.zshjdva.mongodb.net/")
db = conn["test"]
children_collection = db["children"]
