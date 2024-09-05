import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebarback',
  templateUrl: './sidebarback.component.html',
  styleUrls: ['./sidebarback.component.css']
})
export class SidebarbackComponent implements OnInit {
  isLoggedIn: boolean = false;
  ngOnInit(): void {
    // Vérifiez si l'utilisateur est connecté
    if (this.isLoggedIn) {
    }
  }

  constructor( private router: Router) { }
  logout(): void {
   
    this.isLoggedIn = false; // Mettez à jour le statut de connexion
  }
  showparticipation()
  {
    this.router.navigate(['/participations' ]);

  }

}



