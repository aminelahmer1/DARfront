import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { Announcement } from 'src/app/models/announcement.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddAnnouncementComponent implements OnInit {
  announcementForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  showImageUpload: boolean = false;
  lastAnnouncementId: number | null = null;
  gouvernorats: string[] = [
    'Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba', 'Kairouan',
    'Kasserine', 'Kébili', 'Kef', 'Mahdia', 'Manouba', 'Médenine', 'Monastir', 'Nabeul',
    'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
  ];
  types: string[] = ['Location', 'Vente'];

  constructor(private announcementService: AnnouncementService, private router: Router) { }

  ngOnInit(): void {
    this.announcementForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      date: new FormControl('', [Validators.required]),
      prix: new FormControl('', [Validators.required, Validators.min(0)]),
      type_Announcement: new FormControl('', [Validators.required]),
      ville: new FormControl('', [Validators.required]),
      codePostal: new FormControl('', [Validators.required]),
      adresse: new FormControl('', [Validators.required]),
      gouvernorat: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8}$')])  // Numéro de téléphone de 8 chiffres
    });
  }

  // Méthode pour vérifier si un champ est invalide et touché
  isFieldInvalid(field: string): boolean {
    const control = this.announcementForm.get(field);
    return !!(control && control.invalid && control.touched);
  }
  

  onFileChanged(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  saveAnnouncement(): void {
    if (this.announcementForm.invalid) {
      this.announcementForm.markAllAsTouched(); // Marque tous les champs comme touchés pour afficher les erreurs
      return;
    }

    const announcement: Announcement = this.announcementForm.value;
    this.announcementService.addAnnouncement(announcement).subscribe({
      next: (res) => {
        console.log('Annonce ajoutée avec succès:', res);
        this.lastAnnouncementId = res.id_announcement;
        this.showImageUpload = true;  // Afficher le champ pour uploader l'image
        alert('Annonce ajoutée avec succès ! Veuillez ajouter une image si nécessaire.');
      },
      error: (e) => {
        console.error(e);
        alert('Erreur lors de l\'ajout de l\'annonce. Veuillez vérifier les informations et réessayer.');
      }
    });
  }

  uploadImage(): void {
    const fileInput = document.getElementById('image') as HTMLInputElement;
    const file = fileInput?.files?.[0];
    if (file && this.lastAnnouncementId) {
      this.announcementService.uploadImage(this.lastAnnouncementId, file).subscribe({
        next: (filePath) => {
          console.log('Image uploadée avec succès:', filePath);
          this.showImageUpload = false;  // Masquer le champ après l'upload
          alert('Image ajoutée avec succès !');
          this.router.navigate(['/announcements']);
        },
        error: (e) => {
          console.error(e);
          alert('Image ajoutée avec succès !');
          this.router.navigate(['/announcements']);
        }
      });
    }
  }
}
