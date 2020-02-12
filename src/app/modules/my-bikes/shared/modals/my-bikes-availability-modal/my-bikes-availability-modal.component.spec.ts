import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBikesAvailabilityModalComponent } from './my-bikes-availability-modal.component';

describe('MyBikesMergeAvailabilityModalComponent', () => {
  let component: MyBikesAvailabilityModalComponent;
  let fixture: ComponentFixture<MyBikesAvailabilityModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBikesAvailabilityModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBikesAvailabilityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
