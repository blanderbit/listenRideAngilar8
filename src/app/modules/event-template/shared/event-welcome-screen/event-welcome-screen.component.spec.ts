import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventWelcomeScreenComponent } from './event-welcome-screen.component';

describe('EventWelcomeScreenComponent', () => {
  let component: EventWelcomeScreenComponent;
  let fixture: ComponentFixture<EventWelcomeScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventWelcomeScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventWelcomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
