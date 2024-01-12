Face Count App
Overview
The Face Count App is a simple mobile application that allows users to capture images and detect the number of faces in those images using facial recognition technology. The app is built using the Ionic framework for the frontend and Flask, a Python web framework, for the backend.

Features
Image Capture: Users can capture images using the device's camera or select images from the photo library.
Face Detection: The app utilizes a face detection algorithm to identify and count the number of faces in the captured images.
Real-time Updates: The detected faces are highlighted, and the app provides real-time updates on the number of faces detected.
Base64 Encoding: Images are encoded in base64 format before being sent to the Flask backend for processing.
Cross-Platform Compatibility: The app is designed to work on both Android and iOS platforms.
Technologies Used
Frontend: Ionic Framework, Angular, TypeScript
Backend: Flask (Python), OpenCV for face detection
Communication: HTTP requests using Angular's HttpClient module
Mobile Plugin: Cordova Camera plugin for image capture
Setup Instructions
Clone the repository: git clone https://github.com/your-username/face-count-app.git
Navigate to the project folder: cd face-count-app
Install dependencies for the frontend and backend.
Run the app: ionic serve for the frontend and python app.py for the backend.
How to Contribute
We welcome contributions from the community. If you'd like to contribute, please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Make changes and submit a pull request.
