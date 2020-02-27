import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CategoryMultiSelectComponent} from './category-multi-select.component';

describe('CategoryMultiselectComponent', () => {
  let component: CategoryMultiSelectComponent;
  let fixture: ComponentFixture<CategoryMultiSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryMultiSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
