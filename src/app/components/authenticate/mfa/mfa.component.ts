import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MfaVerificationRequest } from 'src/app/shared/mfa-verification-request.model';
import { MfaVerificationResponse } from 'src/app/shared/mfa-verification-response.modal';

@Component({
  selector: 'app-mfa',
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.css']
})
export class MfaComponent implements OnInit {
  @Input("email")
  email!: string;
  message!: string;
  isEvaluator: boolean = false;
  public totpForm!: FormGroup;
  
  constructor(private authenticationClient: AuthenticationService,
              private authService: AuthService,
              private router: Router) { }
  
  ngOnInit(): void {
    this.totpForm = new FormGroup({
      totp_digit1: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.pattern("^[0-9]{1}$")]),
      totp_digit2: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.pattern("^[0-9]{1}$")]),
      totp_digit3: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.pattern("^[0-9]{1}$")]),
      totp_digit4: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.pattern("^[0-9]{1}$")]),
      totp_digit5: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.pattern("^[0-9]{1}$")]),
      totp_digit6: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.pattern("^[0-9]{1}$")]),
    });
  }
  
  moveToNextElement(formControlName: string, nextElement: string) {
    if (this.totpForm.get(formControlName)?.valid) {
      document.getElementById(nextElement)?.focus();
    }
  }
  
  clearValue(formControlName: string) {
    this.totpForm.get(formControlName)?.setValue("");
  }
  
  verifyTOTP() {
    let code: string = this.totpForm.get("totp_digit1")?.value
      + this.totpForm.get("totp_digit2")?.value
      + this.totpForm.get("totp_digit3")?.value
      + this.totpForm.get("totp_digit4")?.value
      + this.totpForm.get("totp_digit5")?.value
      + this.totpForm.get("totp_digit6")?.value;
    
    if (code) {
      let payload: MfaVerificationRequest = new MfaVerificationRequest(this.email, code)
      this.authenticationClient.verifyTotp(payload).subscribe((response: MfaVerificationResponse) => {
        this.message = response.message;
        if (response.tokenValid){
          this.authService.login(response);
          // Redirection en fonction du rôle de l'utilisateur
          if (response.roles.some(role => role.name === 'ADMIN')) {
            this.router.navigateByUrl('/admin1');
          } else if (response.roles.some(role => role.name === 'EVALUATOR')) {
            this.router.navigateByUrl('/front');
          }else {
            this.router.navigateByUrl('/');
          }
        }
      });
    }
  }
}
