def childEntity(item: dict) -> dict:
    return {
        "id": str(item.get("_id", "")),
        "childId": item.get("child_id", ""),
        "gender": item.get("gender", ""),
        "age": item.get("age", ""),
        "childClassification": item.get("childClassification", ""),
        "recommendedForAdoption": item.get("recommendedForAdoption", ""),
        "reasonForAdmission": item.get("reasonForAdmission", ""),
        "caseHistory": item.get("caseHistory", ""),
        "lengthOfStayInShelter": item.get("lengthOfStayInShelter", ""),
    }

def childrenEntity(entity) -> list:
    return [childEntity(item) for item in entity]
