import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.css']
})
export class ContactDialogComponent {
selectedAnnouncement: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { phoneNumber: string, email: string },
    private dialogRef: MatDialogRef<ContactDialogComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
