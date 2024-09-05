import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent {
  
  message = '';
  isOkay = true;
  submitted = false;

  constructor(private authService: AuthService, private router: Router) {}

  onOtpInputChange(event: any) {
    const otp = event.target.value;
    if (otp.length === 6) {
      this.onSubmit(otp); // Automatically submit the form when OTP is complete
    }
  }

  onSubmit(otp: string) {
    this.authService.verificationCode(otp).subscribe({
      next: () => {
        this.message = 'Your account has been successfully activated. Now you can proceed to login.';
        this.submitted = true;
        this.isOkay = true; // Ensure isOkay is set to true on successful activation
      },
      error: () => {
        this.message = 'Token has expired or is invalid. Please try again or request a new activation code.';
        this.submitted = true;
        this.isOkay = false; // Set isOkay to false on failed activation
      }
    });
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }
}
