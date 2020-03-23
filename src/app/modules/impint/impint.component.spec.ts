import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpintComponent } from './impint.component';

describe('ImpintComponent', () => {
  let component: ImpintComponent;
  let fixture: ComponentFixture<ImpintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImpintComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
