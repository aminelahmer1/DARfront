import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080'; // Mettez à jour l'URL de votre API

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  getRolesFromDatabase(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/roles`);
  }

  updateUserProfile(updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profile`, updatedUser);
  }

  getRolesStats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/roles-stats`);
  }

  banUser(email: string, banDurationDays: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/banUser/${email}/${banDurationDays}`, {});
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }
  updateBanStatus(email: string, isBanned: boolean): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/banUser/${email}`, { isBanned });
  }
}
