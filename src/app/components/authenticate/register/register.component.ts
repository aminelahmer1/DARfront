import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GenderType, User } from 'src/app/models/user'; // Assurez-vous que le chemin d'accès est correct

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public registerForm!: FormGroup;
  mfaRes: any;
  isLoading = false;

  roleTypes: string[] = ['USER', 'ADMIN', 'EVALUATOR', 'DANCER', 'VISITOR'];
  genders: string[] = ['MALE', 'FEMALE'];

  constructor(private authenticationClient: AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      paswd: new FormControl('', Validators.required),
      role: new FormControl(null, Validators.required),
      enableMfa: new FormControl('', Validators.required),
      phonenumber: new FormControl('', Validators.required),
      codepostal: new FormControl('', Validators.required),
      commune: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
      expertise: new FormControl('', Validators.required),
      genderType: new FormControl('', Validators.required), // Ajoutez cette ligne pour le genre
    });
    this.mfaRes = null;
  }

  register() {
    this.isLoading = true;

    const selectedRole = this.registerForm.value.role;
    const rolesObject = { name: selectedRole };

    const requestData = {
      ...this.registerForm.value,
      roles: [rolesObject]
    };

    this.authenticationClient.register(requestData)
      .subscribe((mfaQR: any) => {
        this.isLoading = false;
        this.mfaRes = JSON.parse(mfaQR);
        console.log(this.mfaRes);
      });
  }
}
