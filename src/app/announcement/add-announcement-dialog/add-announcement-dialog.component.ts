import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Announcement } from 'src/app/models/announcement.model';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-add-announcement-dialog',
  templateUrl: './add-announcement-dialog.component.html',
  styleUrls: ['./add-announcement-dialog.component.css']
})
export class AddAnnouncementDialogComponent {
  announcement: Announcement = new Announcement(0, '', '', '', '', '', '', '', '', '', '', '','');
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  showImageUpload: boolean = false;
  lastAnnouncementId: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<AddAnnouncementDialogComponent>,
    private announcementService: AnnouncementService
  ) {}

  // Gestion de l'image
  onFileChanged(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Soumission du formulaire
  onSubmit(): void {
    this.announcementService.addAnnouncement(this.announcement).subscribe(
      (res: Announcement) => {
        console.log('Annonce ajoutée avec succès:', res);
        this.lastAnnouncementId = res.id_announcement;
        this.showImageUpload = true;
      },
      error => {
        console.error('Erreur lors de l\'ajout de l\'annonce', error);
        alert('Erreur lors de l\'ajout de l\'annonce. Veuillez vérifier les informations et réessayer.');
      }
    );
  }

  // Upload de l'image
  uploadImage(): void {
    if (this.selectedFile && this.lastAnnouncementId) {
      this.announcementService.uploadImage(this.lastAnnouncementId, this.selectedFile).subscribe(
        (filePath: string) => {
          console.log('Image uploadée avec succès:', filePath);
          this.showImageUpload = false;
          this.dialogRef.close();
        },
        error => {
          console.error('Erreur lors de l\'upload de l\'image', error);
          alert('Erreur lors de l\'upload de l\'image. Veuillez réessayer.');
        }
      );
    }
  }

  // Fermeture du dialogue
  onClose(): void {
    this.dialogRef.close();
  }
}
