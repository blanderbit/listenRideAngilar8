import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBikesDeleteModalComponent } from './my-bikes-delete-modal.component';

describe('MyBikesDeleteModalComponent', () => {
  let component: MyBikesDeleteModalComponent;
  let fixture: ComponentFixture<MyBikesDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBikesDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBikesDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
