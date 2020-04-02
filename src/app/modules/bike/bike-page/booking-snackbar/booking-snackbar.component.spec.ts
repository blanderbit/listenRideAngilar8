import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSnackbarComponent } from './booking-snackbar.component';

describe('BookingSnackbarComponent', () => {
  let component: BookingSnackbarComponent;
  let fixture: ComponentFixture<BookingSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingSnackbarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
