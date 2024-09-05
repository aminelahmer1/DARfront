import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ban-user',
  templateUrl: './ban-user.component.html',
  styleUrls: ['./ban-user.component.css']
})
export class BanUserComponent implements OnInit {
  users: User[] = [];
  banDuration: { [key: number]: number } = {}; // Utilisation de l'objet banDuration pour stocker la durée du bannissement pour chaque utilisateur
  popupMessage: string = '';
  showPopup: boolean = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  banUser(email: string, banDurationDays: number): void {
    this.userService.banUser(email, banDurationDays).subscribe(
        (response) => {
        console.log(response); // Gérer la réponse du backend
        // Afficher le pop-up de réussite
        this.popupMessage = 'User status updated successfully';
        this.showPopup = true;
        setTimeout(() => {
          this.closePopup();
        }, 5000); // Masquer le popup après 5 secondes
      },
      (error) => {
        console.error(error); // Gérer les erreurs
        if (error.status === 400) {
          // Afficher le pop-up d'erreur uniquement si la mise à jour a échoué
          this.popupMessage = 'Failed to update user status';
          this.showPopup = true;
          setTimeout(() => {
            this.closePopup();
          }, 5000); // Masquer le popup après 5 secondes
        }
      }
    );
  }

  closePopup(): void {
    this.popupMessage = '';
    this.showPopup = false;
  }
}
