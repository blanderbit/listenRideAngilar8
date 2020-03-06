import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BikeImagesSwiperComponent} from './bike-images-swiper.component';

describe('BikeImagesSwiperComponent', () => {
  let component: BikeImagesSwiperComponent;
  let fixture: ComponentFixture<BikeImagesSwiperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BikeImagesSwiperComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeImagesSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
