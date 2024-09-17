import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Announcement } from 'src/app/models/announcement.model';
@Component({
  selector: 'app-announcement-details',
  templateUrl: './announcement-details.component.html',
  styleUrls: ['./announcement-details.component.css']
})
export class AnnouncementDetailsComponent {
  selectedAnnouncement: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string,
      description: string,
      date: string,
      prix: string,
      type_Announcement: string,
      codePostal: string,
      ville: string,
      adresse: string,
      gouvernorat: string,
      imagePath: string,
      PhoneNumber:string,
      email:string },
    private dialogRef: MatDialogRef<AnnouncementDetailsComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
