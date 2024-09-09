import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { Announcement } from 'src/app/models/announcement.model';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';

@Component({
  selector: 'app-client-announcement-list',
  templateUrl: './client-announcement-list.component.html',
  styleUrls: ['./client-announcement-list.component.css']
})

export class ClientAnnouncementListComponent implements OnInit {
  announcements: Announcement[] = [];

  constructor(
    private announcementService: AnnouncementService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  private getDialogConfig(phoneNumber: string, email: string): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { phoneNumber, email };
    dialogConfig.width = '300px';
    dialogConfig.height = '200px';
    dialogConfig.enterAnimationDuration = '500ms';
    dialogConfig.exitAnimationDuration = '500ms';
    return dialogConfig;
  }
  openContactDialog(phoneNumber: string, email: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { phoneNumber, email };
    dialogConfig.width = '400px'; 
    dialogConfig.autoFocus = true; 
    dialogConfig.disableClose = false; 
    dialogConfig.hasBackdrop = true; 
    dialogConfig.backdropClass = 'custom-backdrop'; 
    dialogConfig.panelClass = 'custom-dialog-container';
    
    // Désactiver les animations
    dialogConfig.enterAnimationDuration = '0ms';
    dialogConfig.exitAnimationDuration = '0ms';
  
    this.dialog.open(ContactDialogComponent, dialogConfig);
  }
  
  
    

  loadAnnouncements(): void {
    this.announcementService.getAllAnnouncements().subscribe(
      data => this.announcements = data,
      error => console.error('Error loading announcements', error)
    );
  }

  getImageUrl(imagePath: string): string {
    return this.announcementService.getImageUrl(imagePath);
  }
}
