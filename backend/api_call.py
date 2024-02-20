from flask import Flask, request, jsonify
from flask_cors import CORS
import textwrap
import google.generativeai as genai

#Initialize my flask app
app = Flask(__name__)
CORS(app)

# Configure the Google Generative AI model
genai.configure(api_key="AIzaSyDxBt_HZIACj-mSPpnZ4LcQ9Jym2keur_g")
model = genai.GenerativeModel('gemini-pro')

# Define a route that listens for POST requests
@app.route('/generate-content', methods=['POST'])
def generate_content():
    # Extract 'text' from the request body
    data = request.json
    if not data or 'text' not in data:
        return jsonify({'error': 'Missing text'}), 400

    text = data['text']
    
    # Generate content using the model
    try:
        response = model.generate_content(text)

        return jsonify({'generated_text': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)