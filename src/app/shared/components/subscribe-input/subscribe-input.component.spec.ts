import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeInputComponent } from './subscribe-input.component';

describe('SubscribeInputComponent', () => {
  let component: SubscribeInputComponent;
  let fixture: ComponentFixture<SubscribeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
