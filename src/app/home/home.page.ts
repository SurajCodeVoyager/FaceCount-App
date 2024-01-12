import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  capturedImage: string | null = null;  // Initialize to null
  numFaces: number = 0;
  confirmationMessage: string = '';

  // Update this variable with the IP address and port of your Flask server
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private camera: Camera, private http: HttpClient) {}

  async captureImage() {
    try {
      const options: CameraOptions = {
        quality: 90,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
      };

      const imageData = await this.camera.getPicture(options);
      const base64Encoded = btoa(imageData);
      
      // Set the capturedImage variable
      this.capturedImage = 'data:image/jpeg;base64,' + base64Encoded;
      // alert('Base64 Image Data:', base64Encoded);

      // Call the face detection API with the updated apiUrl
      this.detectFaces(this.capturedImage);
    } catch (error) {
      alert('Error capturing image or detecting faces:');
    }
  }

  async captureKnownImage() {
    try {
      const options: CameraOptions = {
        quality: 90,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      };

      const imageData = await this.camera.getPicture(options);

      // Set the capturedImage variable
      this.capturedImage = 'data:image/jpeg;base64,' + imageData;

      // Call the face detection API with the updated apiUrl
      this.detectFaces(this.capturedImage);
    } catch (error) {
      alert('Error capturing known image or detecting faces');
    }
  }

  detectFaces(capturedImage: string) {
    const data = { image_base64: capturedImage };

    this.http.post(`${this.apiUrl}/detect_faces`, data).subscribe({
      next: (response: any) => {
        // Handle the response from the Flask server
        this.capturedImage = response.image_with_faces;
        this.numFaces = response.num_faces;
        this.confirmationMessage = 'Image successfully sent to the server!';
      },
      error: (error) => {
        alert('Error detecting faces:');
        this.confirmationMessage = 'Error sending image to the server.';
      },
      complete: () => {
        // Optional: Handle completion if needed
        console.log('Image sent to server successfully.');
      },
    });
  }
}
