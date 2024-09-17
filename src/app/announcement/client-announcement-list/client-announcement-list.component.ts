import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { Announcement } from 'src/app/models/announcement.model';
import { SearchHistory } from 'src/app/models/search-history';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-client-announcement-list',
  templateUrl: './client-announcement-list.component.html',
  styleUrls: ['./client-announcement-list.component.css']
})
export class ClientAnnouncementListComponent implements OnInit, AfterViewInit {
  announcements: Announcement[] = [];
  searchHistory: SearchHistory[] = [];
  selectedAnnouncement: any;
  searchControl: FormControl = new FormControl();
  filterForm: FormGroup;

  constructor(private announcementService: AnnouncementService) {
    this.filterForm = new FormGroup({
      title: new FormControl(''),
      minPrix: new FormControl(''),
      maxPrix: new FormControl(''),
      type_Announcement: new FormControl(''),
      Date: new FormControl(''),
      gouvernorat: new FormControl(''),
      Ville: new FormControl(''),
      Adresse: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.loadAnnouncements();
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.announcementService.searchAnnouncements(value))
    ).subscribe(
      data => this.announcements = data,
      error => console.error('Error searching announcements', error)
    );
  }

  ngAfterViewInit(): void {
    this.initializeModal('contactModal');
    this.initializeModal('contactModal2');
    this.initializeModal('filterModal');
    this.initializeModal('historyModal');
  }

  initializeModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      new bootstrap.Modal(modalElement);
    } else {
      console.error(`Modal element with id ${modalId} not found`);
    }
  }

  loadAnnouncements(): void {
    this.announcementService.getAllAnnouncements().subscribe(
      data => this.announcements = data,
      error => console.error('Error loading announcements', error)
    );
  }

  filterAnnouncements(): void {
    const filters = this.filterForm.value;
    this.announcementService.filterAnnouncements(filters).subscribe(
      data => this.announcements = data,
      error => console.error('Error filtering announcements', error)
    );
  }

  openFilterModal(): void {
    const modalElement = document.getElementById('filterModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('Modal element not found');
    }
  }

  openContactModal(announcement: any) {
    this.selectedAnnouncement = announcement;
    const modalElement = document.getElementById('contactModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('Modal element not found');
    }
  }

  openDetailsModal(announcement: Announcement) {
    this.selectedAnnouncement = announcement;
    const modalElement = document.getElementById('contactModal2');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('Modal element not found');
    }
  }

  openHistoryModal(): void {
    this.announcementService.getSearchHistory().subscribe(
      data => {
        this.searchHistory = data;
        const modalElement = document.getElementById('historyModal');
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        } else {
          console.error('Modal element not found');
        }
      },
      error => console.error('Error loading search history', error)
    );
  }

  getImageUrl(imagePath: string): string {
    return this.announcementService.getImageUrl(imagePath);
  }
}
