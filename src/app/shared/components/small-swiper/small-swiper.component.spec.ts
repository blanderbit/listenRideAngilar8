import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallSwiperComponent } from './small-swiper.component';

describe('SmallSwiperComponent', () => {
  let component: SmallSwiperComponent;
  let fixture: ComponentFixture<SmallSwiperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallSwiperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
