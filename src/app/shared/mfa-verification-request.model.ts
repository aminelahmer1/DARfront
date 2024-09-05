export class MfaVerificationRequest {
    email!: string;
    totp!: string;
    constructor(email: string,
        totp: string){
            this.email = email!=null?email:"";
            this.totp = totp!=null?totp:"";
        }
}