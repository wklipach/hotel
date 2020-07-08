import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekdaysComponent } from './weekdays.component';

describe('WeekdaysComponent', () => {
  let component: WeekdaysComponent;
  let fixture: ComponentFixture<WeekdaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekdaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekdaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
