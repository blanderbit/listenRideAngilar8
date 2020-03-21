import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsBikesComponent } from './events-bikes.component';

describe('EventsBikesComponent', () => {
  let component: EventsBikesComponent;
  let fixture: ComponentFixture<EventsBikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventsBikesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsBikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
