import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BrandTemplateComponent} from './brand-template.component';

describe('BrandTemplateComponent', () => {
  let component: BrandTemplateComponent;
  let fixture: ComponentFixture<BrandTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrandTemplateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
