import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurProsComponent } from './our-pros.component';

describe('OurProsComponent', () => {
  let component: OurProsComponent;
  let fixture: ComponentFixture<OurProsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurProsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurProsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
