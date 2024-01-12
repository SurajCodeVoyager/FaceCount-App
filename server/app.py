from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import base64

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5000/detect_faces"}})  # Replace with the actual domain of your Ionic app

def process_image(image_data):
    # Decode base64 and convert to NumPy array
    image_data = cv2.imdecode(np.frombuffer(base64.b64decode(image_data), dtype=np.uint8), 1)

    # Convert to grayscale
    gray = cv2.cvtColor(image_data, cv2.COLOR_BGR2GRAY)

    # Use Haarcascades for face detection
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)

    # Draw rectangles around faces for visualization
    for (x, y, w, h) in faces:
        cv2.rectangle(image_data, (x, y), (x+w, y+h), (255, 0, 0), 2)

    # Convert the image with drawn rectangles back to base64
    _, img_encoded = cv2.imencode('.jpg', image_data)
    img_base64 = base64.b64encode(img_encoded.tobytes()).decode('utf-8')

    return img_base64, len(faces)

@app.route('/detect_faces', methods=['POST'])
def detect_faces():
    try:
        if 'image_base64' in request.json:
            # Handle base64-encoded image
            image_base64 = request.json.get('image_base64', '')
            print('Base64 Image Data:', image_base64)

            img_base64, num_faces = process_image(image_base64)

            return jsonify({'image_with_faces': img_base64, 'num_faces': num_faces})
        elif 'image_file' in request.files:
            # Handle uploaded image file
            image_file = request.files['image_file']
            image_data = image_file.read()

            img_base64, num_faces = process_image(base64.b64encode(image_data).decode('utf-8'))

            return jsonify({'image_with_faces': img_base64, 'num_faces': num_faces})
        else:
            return jsonify({'error': 'Invalid request. Either provide image_base64 or image_file.'}), 400
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/')
def index():
    return jsonify({'message': 'Welcome to the Face Detection API'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
