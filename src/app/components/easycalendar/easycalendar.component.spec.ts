import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EasycalendarComponent } from './easycalendar.component';

describe('EasycalendarComponent', () => {
  let component: EasycalendarComponent;
  let fixture: ComponentFixture<EasycalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EasycalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EasycalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
