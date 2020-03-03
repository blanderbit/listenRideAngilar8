import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TimelineBlockComponent} from './timeline-block.component';

describe('TimelineBlockComponent', () => {
  let component: TimelineBlockComponent;
  let fixture: ComponentFixture<TimelineBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimelineBlockComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
