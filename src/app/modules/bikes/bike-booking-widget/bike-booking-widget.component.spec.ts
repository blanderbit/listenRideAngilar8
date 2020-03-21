import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeBookingWidgetComponent } from './bike-booking-widget.component';

describe('BikeBookingWidgetComponent', () => {
  let component: BikeBookingWidgetComponent;
  let fixture: ComponentFixture<BikeBookingWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikeBookingWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeBookingWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
