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

  constructor(
    private announcementService: AnnouncementService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.announcementService.getAllAnnouncements().subscribe(
      data => this.handleSuccess(data),
      error => this.handleError(error)
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
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadAnnouncements(); // Recharger les annonces après l'ajout d'une nouvelle
    });
  }
}
