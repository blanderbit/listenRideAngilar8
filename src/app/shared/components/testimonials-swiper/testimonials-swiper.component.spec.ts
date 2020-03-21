import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsSwiperComponent } from './testimonials-swiper.component';

describe('TestimonialsSwiperComponent', () => {
  let component: TestimonialsSwiperComponent;
  let fixture: ComponentFixture<TestimonialsSwiperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestimonialsSwiperComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialsSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
