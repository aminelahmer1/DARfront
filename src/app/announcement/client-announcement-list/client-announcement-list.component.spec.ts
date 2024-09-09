import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAnnouncementListComponent } from './client-announcement-list.component';

describe('ClientAnnouncementListComponent', () => {
  let component: ClientAnnouncementListComponent;
  let fixture: ComponentFixture<ClientAnnouncementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAnnouncementListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientAnnouncementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
