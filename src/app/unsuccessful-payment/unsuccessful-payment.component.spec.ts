import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuccessfulPaymentComponent } from './unsuccessful-payment.component';

describe('UnsuccessfulPaymentComponent', () => {
  let component: UnsuccessfulPaymentComponent;
  let fixture: ComponentFixture<UnsuccessfulPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsuccessfulPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsuccessfulPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
