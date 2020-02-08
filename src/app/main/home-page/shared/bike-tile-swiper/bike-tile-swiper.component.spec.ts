import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeTileSwiperComponent } from './bike-tile-swiper.component';

describe('BikeCardSwiperComponent', () => {
  let component: BikeTileSwiperComponent;
  let fixture: ComponentFixture<BikeTileSwiperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikeTileSwiperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeTileSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
