import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancePartnersComponent } from './insurance-partners.component';

describe('InsurancePartnersComponent', () => {
  let component: InsurancePartnersComponent;
  let fixture: ComponentFixture<InsurancePartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurancePartnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancePartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
