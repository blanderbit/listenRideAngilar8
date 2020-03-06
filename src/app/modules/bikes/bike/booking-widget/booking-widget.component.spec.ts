import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookingWidgetComponent} from './booking-widget.component';

describe('BookingWidgetComponent', () => {
  let component: BookingWidgetComponent;
  let fixture: ComponentFixture<BookingWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingWidgetComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
