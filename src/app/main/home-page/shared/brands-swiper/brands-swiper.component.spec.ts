import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsSwiperComponent } from './brands-swiper.component';

describe('BrandsSwiperComponent', () => {
  let component: BrandsSwiperComponent;
  let fixture: ComponentFixture<BrandsSwiperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandsSwiperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
