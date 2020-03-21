import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBikesActivateModalComponent } from './my-bikes-activate-modal.component';

describe('MyBikesActivateModalComponent', () => {
  let component: MyBikesActivateModalComponent;
  let fixture: ComponentFixture<MyBikesActivateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyBikesActivateModalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBikesActivateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
