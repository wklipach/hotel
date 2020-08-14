import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashlessComponent } from './cashless.component';

describe('CashlessComponent', () => {
  let component: CashlessComponent;
  let fixture: ComponentFixture<CashlessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashlessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashlessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
