import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomecomponentfrontComponent } from './homecomponentfront.component';

describe('HomecomponentfrontComponent', () => {
  let component: HomecomponentfrontComponent;
  let fixture: ComponentFixture<HomecomponentfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomecomponentfrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomecomponentfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
