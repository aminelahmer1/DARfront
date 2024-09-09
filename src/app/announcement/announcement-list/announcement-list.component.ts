import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { AddAnnouncementDialogComponent } from '../add-announcement-dialog/add-announcement-dialog.component';
import { Announcement } from 'src/app/models/announcement.model';

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.css']
})
export class AnnouncementListComponent implements OnInit {
  announcements: Announcement[] = [];
  selectedFile: File | null = null;
  announcement: Announcement = new Announcement(
    0, // id_announcement
    '', // title
    '', // description
    '', // date
    '', // prix
    '', // type_announcement
    '', // ville
    '', // codePostal
    '', // adresse
    '', // gouvernorat
    '', // PhoneNumber
    '',
    ''  // imagePath
  );

  constructor(
    private announcementService: AnnouncementService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  onFileChanged(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.selectedFile) {
      this.uploadImageAndSaveAnnouncement();
    } else {
      this.saveAnnouncement();
    }
  }

  private uploadImageAndSaveAnnouncement(): void {
    this.announcementService.addAnnouncement(this.announcement).subscribe(
      (res: Announcement) => {
        console.log('Annonce ajoutée avec succès:', res);
        if (this.selectedFile) {
          this.announcementService.uploadImage(res.id_announcement, this.selectedFile).subscribe(
            (fileName: string) => {
              this.announcement.imagePath = 'path/to/server/images/' + fileName; // Adjust path based on your server
              this.loadAnnouncements();
            },
            error => console.error('Error uploading image', error)
          );
        }
      },
      error => {
        console.error('Erreur lors de l\'ajout de l\'annonce', error);
        alert('Erreur lors de l\'ajout de l\'annonce. Veuillez vérifier les informations et réessayer.');
      }
    );
  }

  private saveAnnouncement(): void {
    this.announcementService.addAnnouncement(this.announcement).subscribe(
      res => {
        console.log(res);
        alert('Annonce ajoutée avec succès!');
        this.loadAnnouncements();
      },
      error => {
        console.error('Error adding announcement', error);
        alert('Erreur lors de l\'ajout de l\'annonce. Veuillez vérifier les informations et réessayer.');
      }
    );
  }

  getImageUrl(imagePath: string): string {
    return `http://localhost:8081/announcement-images/${imagePath}`;
  }

  loadAnnouncements(): void {
    this.announcementService.getAllAnnouncements().subscribe(
      data => this.announcements = data,
      error => console.error('Error loading announcements', error)
    );
  }


  private handleSuccess(data: Announcement[]): void {
    this.announcements = data;
  }

  private handleError(error: any): void {
    console.error('Error loading announcements', error);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddAnnouncementDialogComponent, {
      width: '800px',
      height: '600px',
      maxWidth: '90vw', // Optionnel : pour rendre le dialogue responsive
      maxHeight: '90vh', // Optionnel : pour éviter que le dialogue ne dépasse la hauteur de la fenêtre
      panelClass: 'custom-dialog-container' // Appliquer une classe CSS personnalisée
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.loadAnnouncements(); // Recharger les annonces après l'ajout
    });
  }
  

  deleteAnnouncement(id: number): void {
    const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?');
    if (confirmDelete) {
      this.announcementService.deleteAnnouncement(id).subscribe({
        next: () => {
          alert('Annonce supprimée avec succès !');
          this.loadAnnouncements(); // Recharger les annonces après la suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de l\'annonce', err);
          alert('Une erreur est survenue lors de la suppression. Veuillez réessayer.');
        }
      });
    }
  }
}
