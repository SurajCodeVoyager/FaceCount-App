// src/app/services/face-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaceApiService {
  private apiUrl = 'http://127.0.0.1:5000'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  detectFaces(imageBase64: string): Observable<any> {
    const data = { image_base64: imageBase64 };
    return this.http.post(`${this.apiUrl}/detect_faces`, data);
  }
}