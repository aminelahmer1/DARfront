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
  announcement: Announcement = new Announcement(0, '', '', '', '', '', '', '', '', '', '','');
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    public dialogRef: MatDialogRef<AddAnnouncementDialogComponent>,
    private announcementService: AnnouncementService
  ) {}

  // Méthode pour gérer le changement de fichier
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

  // Méthode pour soumettre le formulaire
  onSubmit(): void {
    if (this.selectedFile) {
      this.uploadImageAndSaveAnnouncement();
    } else {
      this.saveAnnouncement();
    }
  }

  // Méthode pour télécharger l'image et sauvegarder l'annonce
  private uploadImageAndSaveAnnouncement(): void {
    this.announcementService.uploadImage(this.selectedFile!).subscribe(
      (fileName: string) => {
        this.announcement.imagePath = fileName;
        this.saveAnnouncement();
      },
      error => console.error('Error uploading image', error)
    );
  }

  // Méthode pour sauvegarder l'annonce
  private saveAnnouncement(): void {
    this.announcementService.addAnnouncement(this.announcement).subscribe(
      response => {
        console.log('Announcement added successfully', response);
        this.dialogRef.close();
      },
      error => console.error('Error adding announcement', error)
    );
  }

  // Méthode pour fermer le dialogue
  onClose(): void {
    this.dialogRef.close();
  }
}
