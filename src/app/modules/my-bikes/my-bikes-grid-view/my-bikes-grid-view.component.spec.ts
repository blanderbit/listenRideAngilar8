import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBikesGridViewComponent } from './my-bikes-grid-view.component';

describe('MyBikesGridViewComponent', () => {
  let component: MyBikesGridViewComponent;
  let fixture: ComponentFixture<MyBikesGridViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBikesGridViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBikesGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
