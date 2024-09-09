import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { Announcement } from 'src/app/models/announcement.model';

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

  constructor(private announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.announcementForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      email: new FormControl(''),
      date: new FormControl(''),
      prix: new FormControl(''),
      type_announcement: new FormControl(''),
      ville: new FormControl(''),
      codePostal: new FormControl(''),
      adresse: new FormControl(''),
      gouvernorat: new FormControl(''),
      PhoneNumber: new FormControl('')
    });
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
        },
        error: (e) => {
          console.error(e);
          alert('Erreur lors de l\'upload de l\'image. Veuillez réessayer.');
        }
      });
    }
  }
}
