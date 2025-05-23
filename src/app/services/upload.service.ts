import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private apiUrl = 'http://localhost:3000/upload';

  constructor(private http: HttpClient) {}

  uploadFile(file: File, id: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', id);
    return this.http.post(this.apiUrl, formData);
  }
}
