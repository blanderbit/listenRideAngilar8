import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBikesTableViewComponent } from './my-bikes-table-view.component';

describe('ListMyBikeStepTwoComponent', () => {
  let component: MyBikesTableViewComponent;
  let fixture: ComponentFixture<MyBikesTableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyBikesTableViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBikesTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
