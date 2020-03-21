import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImageOnBgTextComponent} from './image-on-bg-text.component';

describe('ImageOnBgTextComponent', () => {
  let component: ImageOnBgTextComponent;
  let fixture: ComponentFixture<ImageOnBgTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageOnBgTextComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageOnBgTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
