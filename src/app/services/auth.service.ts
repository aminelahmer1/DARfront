import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';
import { MfaVerificationRequest } from '../shared/mfa-verification-request.model';
import { MfaVerificationResponse } from '../shared/mfa-verification-response.modal';
import { AuthenticationService } from './authentication.service';
const API_URL = 'http://localhost:8080/api/test/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private roleKey = 'userRole';
  constructor(private authenticationClient: AuthenticationService, private router: Router, private Http: HttpClient) { }
  public login(payload: MfaVerificationResponse): void {
    if (payload.tokenValid && !payload.mfaRequired) {
      localStorage.clear();
      localStorage.setItem(this.tokenKey, payload.jwt);
      this.router.navigate(['/home']);
    }
  }
  // Méthode pour récupérer les rôles depuis le backend
  getRolesFromDatabase(): Observable<any[]> {
    return this.Http.get<string[]>('/api/roles');
  }
  private apiUrl = 'http://localhost:8080'; // Mettez à jour l'URL de votre API
  // Méthode pour vérifier si l'utilisateur est administrateur
 // isAdmin(email: string): Observable<boolean> {
 //   return this.Http.get<boolean>(`${this.apiUrl}/isAdmin/${email}`);
 // }
  getCurrentUserEmail(): Observable<string> {
    return this.Http.get<string>(`${this.baseUrl}/getCurrentUserEmail`);
  }

  public navidateToHome(): void {
    this.router.navigate(['/']);
  }

  public register(payload: string): void {
    this.authenticationClient
      .register(payload)
      .subscribe((mfaQR:any) => {
        let parsed = JSON.parse(mfaQR);
        //localStorage.setItem(this.tokenKey, token);
        this.router.navigate(['/qr', {'qrCode': parsed.qrCode, 'qrCodeKey': parsed.mfaCode}]);
      });
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    this.router.navigate(['/login']);
  }



  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }

  forgotPassword(email: string): Observable<any> {
    const url = `http://localhost:8080/forgot-password?email=${encodeURIComponent(email)}`;
    return this.Http.post(url, {});
  }
  resetPassword(token: string, newPassword: string): Observable<any> {
    const url = 'http://localhost:8080/reset-password';

    // Créer les paramètres de la requête
    let params = new HttpParams();
    params = params.append('token', token);
    params = params.append('newPassword', newPassword);

    // Envoyer la requête avec les paramètres dans l'URL
    return this.Http.post<any>(url, {}, { params });
  }
  private baseUrl = 'http://localhost:8080'
  getCurrentUsersWithRole(id: any, role: string): Observable<any> {
    return this.Http.get<any>(this.baseUrl +"/current/user/" + id+"/"+role);
  }



  loggedInUserEmail: string | null = null;

  // Méthode pour stocker l'email de l'utilisateur connecté
  setLoggedInUserEmail(email: string): void {
    this.loggedInUserEmail = email;
  }

  // Méthode pour obtenir l'email de l'utilisateur connecté
  getLoggedInUserEmail(): string | null {
    return this.loggedInUserEmail;
  }
  private userRole: string | null = null;
  // Méthode pour stocker le rôle de l'utilisateur
  setUserRole(role: string): void {
    this.userRole = role;
  }

  // Méthode pour récupérer le rôle de l'utilisateur
  getUserRole(): string | null {
    return this.userRole;
  }
  getPublicContent(): Observable<any> {
    return this.Http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    
    return this.Http.get(API_URL + 'user', { responseType: 'text' });
  }
  
  getModeratorBoard(): Observable<any> {
    return this.Http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.Http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getUserRoleByEmail(email: string): Observable<string> {
    return this.Http.get<string>(`${this.baseUrl}/role/${email}`);
  }
  
}
