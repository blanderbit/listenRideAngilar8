import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BrandTemplateBikeListComponent} from './brand-template-bike-list.component';

describe('BrandTemplateBikeListComponent', () => {
  let component: BrandTemplateBikeListComponent;
  let fixture: ComponentFixture<BrandTemplateBikeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrandTemplateBikeListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandTemplateBikeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
