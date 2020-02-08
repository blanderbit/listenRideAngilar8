import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchingFormComponent } from './searching-form.component';

describe('SearchingFormComponent', () => {
  let component: SearchingFormComponent;
  let fixture: ComponentFixture<SearchingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
