/*import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      paswd: ['', Validators.required]
    });
  }

  get formControls() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email;
    const paswd = this.loginForm.value.paswd;

    this.authenticationService.authenticate(email, paswd).subscribe(
      (data) => {
        console.log('Authentication successful!', data);
        // Gérer la redirection de l'utilisateur ou d'autres actions après l'authentification réussie
      },
      (error) => {
        console.error('Authentication failed:', error);
        // Gérer les erreurs d'authentification, par exemple, afficher un message d'erreur à l'utilisateur
      }
    );
  }
}*/

/*import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MfaVerificationResponse } from 'src/app/shared/mfa-verification-response.modal';
import { Router } from '@angular/router';
import { Visiteur } from 'src/app/models/Visiteur';
import { DancersGroup } from 'src/app/models/DancersGroup';
import { Evaluator } from 'src/app/models/Evaluator';
  
@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent {

  public loginForm!: FormGroup;
  response!: MfaVerificationResponse;
  message!: string;
  current_User?: any;

  constructor(
    private authenticationClient: AuthenticationService,
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.isLoggedIn())
      this.authService.navidateToHome();
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    this.authenticationClient.login(this.loginForm.value).subscribe((loginResponse: MfaVerificationResponse) => {
      this.response = loginResponse;
      this.message = loginResponse.message;

      // Vérifier si la réponse contient des informations sur le rôle de l'utilisateur
      if (this.response.user && this.response.user.roles && this.response.user.roles.length > 0) {
        const role = this.response.user.roles[0].name;
        // Logique de redirection en fonction du rôle de l'utilisateur

        switch (role) {
          case 'ADMIN':
            this.router.navigate(['/admin']);
            break;
          case 'EVALUATOR':
            console.log("pskkk");
            const med: Evaluator = {
              idEvaluator: this.current_User.idEvaluator,
              user: this.current_User.user
            };
            localStorage.setItem('EVALUATOR', JSON.stringify(med));
            this.router.navigate(['/']);
            break;
          case 'VISITOR':
            const med1: Visiteur = {
              idVisiteur: this.current_User.idVisiteur,
              user: this.current_User.user
            };
            localStorage.setItem('VISITOR', JSON.stringify(med1));
            this.router.navigate(['/']);
            break;
          case 'USER':
            this.router.navigate(['/']);
            break;
          case 'DANCER':
            const pas: DancersGroup = {
              groupID: this.current_User.groupID,
              users: this.current_User.user,
              groupName: this.current_User.groupName,
              groupDescription: this.current_User.groupDescription,
              members: this.current_User.members
            };
            localStorage.setItem('DANCER', JSON.stringify(pas));
            this.router.navigate(['/admin']);
            break;
          default:
            this.router.navigate(['/']);
            break;
        }

        // Appeler getCurrentUsersWithRole si role est défini
        if (role) {
          this.authenticationClient.getCurrentUsersWithRole(this.response.user.id, role).subscribe((userData: any) => {
            // Traiter les données de l'utilisateur ici selon vos besoins
            console.log(userData);
          });
        } else {
          console.error("Role is undefined");
        }
      } else {
        // Gérer le cas où les informations sur le rôle de l'utilisateur ne sont pas disponibles
        console.error("Role information not available in response");
      }
    });
  }

  forgotPassword(event: Event) {
    event.preventDefault(); // Empêcher le comportement par défaut du lien

    const email = this.loginForm.get('email')?.value; // Récupérer l'e-mail à partir du formulaire
    this.authService.forgotPassword(email).subscribe(() => {
      // Gérer la réponse de succès ici, par exemple afficher un message à l'utilisateur
      console.log('Email sent successfully');
    }, (error) => {
      // Gérer les erreurs ici, par exemple afficher un message d'erreur à l'utilisateur
      console.error('Error sending email:', error);
    });
  }
}*/
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MfaVerificationResponse } from 'src/app/shared/mfa-verification-response.modal';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent {

  public loginForm!: FormGroup;
  response!: MfaVerificationResponse;
  message!: string;
  constructor(private authenticationClient: AuthenticationService,private router:Router,
    private authService: AuthService) { 
      if(this.authService.isLoggedIn())
        this.authService.navidateToHome();

    }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

  }

  login(){
    this.authenticationClient.login(this.loginForm.value).subscribe((loginResponse: MfaVerificationResponse) => {
      this.response = loginResponse;
      this.message = loginResponse.message;
      // Après que l'utilisateur se soit connecté avec succès, récupérez son rôle
      if (loginResponse.tokenValid && !loginResponse.mfaRequired) {
        const userEmail = loginResponse.email;
        this.authService.getUserRoleByEmail(userEmail).subscribe(
          (role) => {
            console.log('Role:', role);
            // Faites ce que vous devez faire avec le rôle récupéré, par exemple, stockez-le dans le service AuthService
            this.authService.setUserRole(role);
            // Vérifiez si l'utilisateur est administrateur et redirigez-le vers la page "/admin"
            if (role === 'admin') {
              this.router.navigate(['/admin1']);
            } else {
              // Redirigez l'utilisateur vers une autre page en fonction de son rôle
              // Par exemple, s'il est un utilisateur normal, vous pouvez le rediriger vers une page utilisateur
            }
          },
          (error) => {
            console.error('Erreur lors de la récupération du rôle:', error);
          }
        );
      }
    });
  }


  public popupMessage: string = '';



  forgotPassword(event: Event) {
    event.preventDefault();
  
    const email = this.loginForm.get('email')?.value;
    this.authService.forgotPassword(email).subscribe(() => {
      this.popupMessage = 'Email sent successfully';
      setTimeout(() => {
        this.popupMessage = '';
      }, 10000); // Délai de 6 secondes avant de réinitialiser le message du popup
    }, (error) => {
      if (error && error.status === 200) {
        this.popupMessage = 'Email sent successfully';
        setTimeout(() => {
          this.popupMessage = '';
        }, 10000);
      } else if (error && error.status === 409) {
        this.popupMessage = 'Email already sent';
        setTimeout(() => {
          this.popupMessage = '';
        }, 10000);
      } else {
        this.popupMessage = 'Error sending email. Please try again later.';
        setTimeout(() => {
          this.popupMessage = '';
        }, 10000);
      }
    });
  }
  
}  

    //  this.roles = this.storageService.getUser().roles;
      //this.reloadPage();




 /* loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      paswd: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email;
    const paswd = this.loginForm.value.paswd;

    this.authenticationService.authenticate(email, paswd).subscribe(
      (data) => {
        console.log('Authentication successful!', data);

        if (data && data.token) {
          // Authentication successful, navigate to appropriate route based on roles
          if (data.roles && data.roles.includes('ADMIN')) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/front']); 
          }
        } else {
          // Handle invalid response from authentication service
          console.error('Invalid authentication response:', data);
          // Optionally, display an error message to the user
        }
      },
      (error) => {
        console.error('Authentication failed:', error);
        // Optionally, display an error message to the user
      }
    );
  }

  if (this.response.user && this.response.user.roles && this.response.user.roles.length > 0) {
    const role = this.response.user.roles[0].name;

    if (role) {
      this.userAuthServiceService.setRoles(this.response.user.roles);
      this.userAuthServiceService.setToken(this.response.jwt);

      if (this.response.user.id) {
        this.authenticationClient.getCurrentUsersWithRole(this.response.user.id, role).subscribe((userData: any) => {
          this.current_User = userData;

          switch (role) {
            case 'ADMIN':
              this.router.navigateByUrl('/admin');
              break;
            case 'EVALUATOR':
              const evaluator: Evaluator = {
                idEvaluator: this.current_User.idEvaluator,
                user: this.current_User.user
              };
              localStorage.setItem('EVALUATOR', JSON.stringify(evaluator));
              this.router.navigateByUrl('/');
              break;
            case 'VISITOR':
              const visitor: Visiteur = {
                idVisiteur: this.current_User.idVisiteur,
                user: this.current_User.user
              };
              localStorage.setItem('VISITOR', JSON.stringify(visitor));
              this.router.navigateByUrl('/');
              break;
            // Add cases for other roles as needed
            default:
              this.router.navigateByUrl('/');
              break;
          }
        });
      } else {
        console.error("User ID is undefined");
      }
    } else {
      console.error("Role is undefined");
    }
  } else {
    console.error("User information not available in response");
  }*/