import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../domain/User';



@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = 'http://localhost:9092/api/'
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(this.API_URL + 'test/all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(this.API_URL + 'test/user', { responseType: 'text' });
  }
  
  getModeratorBoard(): Observable<any> {
    return this.http.get(this.API_URL + 'test/mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(this.API_URL + 'test/admin', { responseType: 'text' });
  }
  updateUser(user: any): Observable<any> {
    return this.http.put(this.API_URL + 'user/update', user)
  }

  getUserById(): Observable<any> {
    return this.http.get(this.API_URL + 'user/retrieve')
  }
}