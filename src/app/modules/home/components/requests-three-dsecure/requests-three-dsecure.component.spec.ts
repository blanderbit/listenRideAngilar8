import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsThreeDSecureComponent } from './requests-three-dsecure.component';

describe('RequestsThreeDSecureComponent', () => {
  let component: RequestsThreeDSecureComponent;
  let fixture: ComponentFixture<RequestsThreeDSecureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestsThreeDSecureComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsThreeDSecureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
