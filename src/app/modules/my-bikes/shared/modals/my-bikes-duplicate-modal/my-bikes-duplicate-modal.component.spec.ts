import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBikesDuplicateModalComponent } from './my-bikes-duplicate-modal.component';

describe('MyBikesDuplicateModalComponent', () => {
  let component: MyBikesDuplicateModalComponent;
  let fixture: ComponentFixture<MyBikesDuplicateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyBikesDuplicateModalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBikesDuplicateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
