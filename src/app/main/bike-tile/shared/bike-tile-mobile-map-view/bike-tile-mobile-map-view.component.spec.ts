import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeTileMobileMapViewComponent } from './bike-tile-mobile-map-view.component';

describe('BikeTileMobileMapViewComponent', () => {
  let component: BikeTileMobileMapViewComponent;
  let fixture: ComponentFixture<BikeTileMobileMapViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikeTileMobileMapViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeTileMobileMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
