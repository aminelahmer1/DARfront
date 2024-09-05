import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MfaVerificationRequest } from 'src/app/shared/mfa-verification-request.model';
import { MfaVerificationResponse } from 'src/app/shared/mfa-verification-response.modal';

@Component({
  selector: 'app-display-qr',
  templateUrl: './display-qr.component.html',
  styleUrls: ['./display-qr.component.css']
})
export class DisplayQrComponent {
  @Input("qrCode")
  imageUrl: any;
  @Input("qrCodeKey")
  qrCodeKey: any;
  @Input("username")
  username!: string;
  totpForm!: FormGroup;
  message!: string;
  constructor(private authenticationClient: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.totpForm = new FormGroup({
      totp: new FormControl('', Validators.required)
    })
  }
  confirm(){
    let totop = this.totpForm?.get("totp")?.value;
    if(totop){
      let payload: MfaVerificationRequest = new MfaVerificationRequest(this.username, totop)
      this.authenticationClient.verifyTotp(payload).subscribe((response: MfaVerificationResponse) => {
        this.message = response.message;
        if(response.tokenValid)
          this.router.navigate(['/login']);
      });
    }
  }
}
