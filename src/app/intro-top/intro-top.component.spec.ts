import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroTopComponent } from './intro-top.component';

describe('IntroTopComponent', () => {
  let component: IntroTopComponent;
  let fixture: ComponentFixture<IntroTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
