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

  constructor(private announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.announcementForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
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
        console.log(res);
        alert('Annonce ajoutée avec succès!');
      },
      error: (e) => {
        console.error(e);
        alert('Erreur lors de l\'ajout de l\'annonce. Veuillez vérifier les informations et réessayer.');
      }
    });
  }
}
