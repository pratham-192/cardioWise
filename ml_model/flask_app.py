from flask import Flask, request, jsonify
import numpy as np
import pickle

app = Flask(__name__)

# Load your trained model
def load_model(model_path='trained_model.pkl'):
    try:
        with open(model_path, 'rb') as model_file:
            model = pickle.load(model_file)
        return model
    except Exception as e:
        raise Exception(f"Error loading the model: {str(e)}")

# Define a route for the home page
@app.route('/')
def home():
    return "Welcome to the Flask App!"

# Define a route for handling predictions
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from the request
        request_data = request.get_json()

        # Load the trained model
        model = load_model()

        # Extract data from the request
        input_data = [
            request_data.get('General_Health', 0),
            request_data.get('Checkup', 0),
            request_data.get('Exercise', 0),
            request_data.get('Skin_Cancer', 0),
            request_data.get('Other_Cancer', 0),
            request_data.get('Depression', 0),
            request_data.get('Diabetes', 0),
            request_data.get('Arthritis', 0),
            request_data.get('Sex', 0),
            request_data.get('Height_(cm)', 0),
            request_data.get('Weight_(kg)', 0),
            request_data.get('Smoking_History', 0),
            request_data.get('Alcohol_Consumption', 0),
            request_data.get('Fruit_Consumption', 0),
            request_data.get('Green_Vegetables_Consumption', 0),
            request_data.get('FriedPotato_Consumption', 0),
            request_data.get('Age_min', 0)
        ]

        # Make probability predictions using the model
        input_data = np.array(input_data).reshape(1, -1)
        probabilities = model.predict_proba(input_data)

        # Extract the probability for the positive class (assuming binary classification)
        probability_of_occurrence = probabilities[0, 1]

        # Return the probability as JSON
        return jsonify({'probability_of_occurrence': float(probability_of_occurrence)})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=False, port=5000)

