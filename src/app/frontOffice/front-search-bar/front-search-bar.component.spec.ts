import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontSearchBarComponent } from './front-search-bar.component';

describe('FrontSearchBarComponent', () => {
  let component: FrontSearchBarComponent;
  let fixture: ComponentFixture<FrontSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontSearchBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
