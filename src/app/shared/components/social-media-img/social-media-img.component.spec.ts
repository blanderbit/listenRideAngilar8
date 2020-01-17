import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaImgComponent } from './social-media-img.component';

describe('SocialMediaImgComponent', () => {
  let component: SocialMediaImgComponent;
  let fixture: ComponentFixture<SocialMediaImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialMediaImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
