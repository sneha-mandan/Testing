import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth/register'; 

  constructor(private http: HttpClient) {}

  register(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, credentials);
  }
}

