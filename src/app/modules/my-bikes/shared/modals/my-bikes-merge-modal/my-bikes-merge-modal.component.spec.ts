import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBikesMergeModalComponent } from './my-bikes-merge-modal.component';

describe('MyBikesMergeModalComponent', () => {
  let component: MyBikesMergeModalComponent;
  let fixture: ComponentFixture<MyBikesMergeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBikesMergeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBikesMergeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
