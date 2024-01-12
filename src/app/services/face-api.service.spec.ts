// src/app/services/face-api.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FaceApiService } from './face-api.service';

describe('FaceApiService', () => {
  let service: FaceApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FaceApiService]
    });

    service = TestBed.inject(FaceApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to detect_faces', () => {
    const imageBase64 = 'your_image_base64_string_here';

    service.detectFaces(imageBase64).subscribe(response => {
      expect(response).toBeTruthy();  // Adjust your expectations based on your API response
    });

    const req = httpTestingController.expectOne('http://127.0.0.1:5000/detect_faces');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ image_base64: imageBase64 });

    req.flush({ /* Your mock response data here */ });
  });
});
