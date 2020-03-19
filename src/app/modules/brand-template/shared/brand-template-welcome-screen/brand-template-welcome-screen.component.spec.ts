import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BrandTemplateWelcomeScreenComponent} from './brand-template-welcome-screen.component';

describe('BrandTemplateWelcomeScreenComponent', () => {
  let component: BrandTemplateWelcomeScreenComponent;
  let fixture: ComponentFixture<BrandTemplateWelcomeScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrandTemplateWelcomeScreenComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandTemplateWelcomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
