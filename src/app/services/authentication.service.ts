import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MfaVerificationResponse } from '../shared/mfa-verification-response.modal';
import { MfaVerificationRequest } from '../shared/mfa-verification-request.model';
import { environment } from 'src/environments/environment.prod';
import { UserAuthServiceService } from './auth/user-auth-service.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {



  constructor(private http: HttpClient, private userAuthServiceService:UserAuthServiceService, private router:Router) { }

  public login(payload: string): Observable<MfaVerificationResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<MfaVerificationResponse>(
      environment.apiUrl + '`http://localhost:8081/login', payload, httpOptions
    );
  }

  public verifyTotp(payload: MfaVerificationRequest): Observable<MfaVerificationResponse> {
    return this.http.post<MfaVerificationResponse>(
      environment.apiUrl + '/verifyTotp', payload
    );
  }

  public register(
    payload: string
  ): Observable<string> {
    return this.http.post(
      environment.apiUrl + '/register',payload,
      { responseType: 'text' }
    );
  }
  public roleMatch(allowedRoles: any): any {
    let isMatch = false;
    const userRoles : any = this.userAuthServiceService.getRoles();    
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].name === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }
  public navidateToAdmin(): void {
    // Implémentez la logique pour rediriger vers la page d'administration
    // Utilisez le service Router pour effectuer la redirection
    this.router.navigate(['/admin']);
  }
  private baseUrl = 'http://localhost:8081'
  getCurrentUsersWithRole(id: any, role: string): Observable<any> {
    return this.http.get<any>(this.baseUrl +"/current/user/" + id+"/"+role);
  }
 /* getCurrentUsersWithRole(id: any, role: string): Observable<any> {
    const params = {
      id: id,
      role: role
    };
  
    return this.http.get<any>(`${this.baseUrl}/current/user`, { params: params });
  }*/
  
//****** STATS ******* */
  
  getLengthByRole(role:string) {
    return this.http.get<any[]>(this.baseUrl +"/users/connected/"+role).pipe(
      map((users: any[]) => users.length)
    );
  }

  forgotPassword(email: string): Observable<any> {
    const url = `http://localhost:8081/forgot-password?email=${encodeURIComponent(email)}`;
    return this.http.post(url, {});
  }
  resetPassword(token: string, newPassword: string): Observable<any> {
    const url = 'http://localhost:8081/reset-password';

    // Créer les paramètres de la requête
    let params = new HttpParams();
    params = params.append('token', token);
    params = params.append('newPassword', newPassword);

    // Envoyer la requête avec les paramètres dans l'URL
    return this.http.post<any>(url, {}, { params });
  }
}
