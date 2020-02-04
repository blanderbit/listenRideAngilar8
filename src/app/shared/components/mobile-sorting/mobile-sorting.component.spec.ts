import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSortingComponent } from './mobile-sorting.component';

describe('MobileSortingComponent', () => {
  let component: MobileSortingComponent;
  let fixture: ComponentFixture<MobileSortingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSortingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
