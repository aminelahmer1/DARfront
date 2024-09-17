import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementStatsComponent } from './announcement-stats.component';

describe('AnnouncementStatsComponent', () => {
  let component: AnnouncementStatsComponent;
  let fixture: ComponentFixture<AnnouncementStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
