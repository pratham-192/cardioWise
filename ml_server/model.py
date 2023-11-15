from transformers import pipeline

classifier = pipeline("zero-shot-classification", model = 'microsoft/deberta-v3-small')
sentiment_labels = ["Urgent Adoption", "Adopt Later"]

def get_prediction(text: str) -> str:
    if text.strip() == "":
        return "unknown"
    else:
        result = classifier(text, sentiment_labels)
        return result["labels"][0]