from child_schema import childrenEntity
from db import children_collection
from text_cleaning import clean_text

def get_text(child: dict) -> str:
    text = (
    'Gender : ' + child['gender'] + '\n' +
    ' Age : ' + child['age'] + '\n' +
    ' Child Classification : ' + child['childClassification'] + '\n' +
    ' Recommended For Adoption Inquiry : ' + child['recommendedForAdoption'] + '\n' +
    ' Reason for Admission : ' + child['reasonForAdmission'] + '\n' +
    ' Case History : ' + child['caseHistory'] + '\n' +
    ' Length of stay in the shelter : ' + child['lengthOfStayInShelter']
    )
    return text

def get_clean_text(text: str) -> str:
    return clean_text(text)

def get_children() -> list:
    projection = {"child_id": 1, "gender": 1, "age": 1, "childClassification": 1,
                   "recommendedForAdoption": 1, "reasonForAdmission": 1, "caseHistory": 1,
                    "lengthOfStayInShelter": 1}
    children = childrenEntity(children_collection.find({}, projection))
    return children