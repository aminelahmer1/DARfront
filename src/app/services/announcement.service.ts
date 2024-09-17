import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Announcement } from '../models/announcement.model';
import { SearchHistory } from '../models/search-history';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  getAllAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.baseUrl}/getAllAnnouncements`);
  }

  addAnnouncement(announcement: Announcement): Observable<Announcement> {
    return this.http.post<Announcement>(`${this.baseUrl}/addAnnouncement`, announcement);
  }

  updateAnnouncement(id: number, announcement: Announcement): Observable<Announcement> {
    return this.http.put<Announcement>(`${this.baseUrl}/updateAnnouncement/${id}`, announcement);
  }

  deleteAnnouncement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteAnnouncement/${id}`);
  }

  uploadImage(Id_announcement: number, file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<string>(`${this.baseUrl}/uploadImage/${Id_announcement}`, formData);
  }
  

  uploadVideo(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/uploadVideo`, formData, { responseType: 'text' });
  }

  getAnnouncementsByUserId(userId: number): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.baseUrl}/api/announcements/user/${userId}`);
  }
 getImageUrl(imagePath: string): string {
  return `${this.baseUrl}/announcement-images/${imagePath}`;
}

  
 
  searchAnnouncements(keyword: string): Observable<Announcement[]> {
    let params = new HttpParams().set('keyword', keyword);
    return this.http.get<Announcement[]>(`${this.baseUrl}/search`, { params });
  }
  filterAnnouncements(filters: any): Observable<Announcement[]> {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      params = params.append(key, filters[key] || '');
    });
    return this.http.get<Announcement[]>(`${this.baseUrl}/filterAnnouncements`, { params });
  }
  getSearchHistory(): Observable<SearchHistory[]> {
    return this.http.get<SearchHistory[]>(`${this.baseUrl}/searchHistory`);
  }
  countAnnouncementsByGouvernorat(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/countAnnouncementsByGouvernorat`);
  }

  
}
