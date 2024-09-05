import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAnnouncementDialogComponent } from 'src/app/announcement/add-announcement-dialog/add-announcement-dialog.component';

@Component({
  selector: 'app-homecomponentfront',
  templateUrl: './homecomponentfront.component.html',
  styleUrls: ['./homecomponentfront.component.css']
})
export class HomecomponentfrontComponent {

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddAnnouncementDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
