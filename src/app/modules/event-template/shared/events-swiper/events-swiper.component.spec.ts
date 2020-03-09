import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventsSwiperComponent} from './events-swiper.component';

describe('EventsSwiperComponent', () => {
  let component: EventsSwiperComponent;
  let fixture: ComponentFixture<EventsSwiperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventsSwiperComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
