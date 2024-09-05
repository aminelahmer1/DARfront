import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarcomponentfrontComponent } from './navbarcomponentfront.component';

describe('NavbarcomponentfrontComponent', () => {
  let component: NavbarcomponentfrontComponent;
  let fixture: ComponentFixture<NavbarcomponentfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarcomponentfrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarcomponentfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
