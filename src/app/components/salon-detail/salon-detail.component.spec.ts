import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonDetailComponent } from './salon-detail.component';

describe('SalonDetailComponent', () => {
  let component: SalonDetailComponent;
  let fixture: ComponentFixture<SalonDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
