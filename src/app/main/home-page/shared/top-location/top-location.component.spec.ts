import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLocationComponent } from './top-location.component';

describe('TopLocationComponent', () => {
  let component: TopLocationComponent;
  let fixture: ComponentFixture<TopLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
