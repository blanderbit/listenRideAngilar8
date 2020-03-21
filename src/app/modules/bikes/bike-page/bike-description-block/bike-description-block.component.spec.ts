import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeDescriptionBlockComponent } from './bike-description-block.component';

describe('BikeDescriptionBlockComponent', () => {
  let component: BikeDescriptionBlockComponent;
  let fixture: ComponentFixture<BikeDescriptionBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BikeDescriptionBlockComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeDescriptionBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
