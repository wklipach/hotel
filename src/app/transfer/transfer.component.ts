import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TransferService } from '../services/transfer.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  transferForm: FormGroup;
  sError = '';
  sResultEmail = '';
  orderPay = false;

  constructor(private ts: TransferService) {
    this.transferForm  = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      wishes: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  transfertLadoga() {
    console.log('transfertLadoga');
    this.orderPay = true;
    this.sError = '';
    this.sResultEmail = '';
    this.transferForm.controls.wishes.setValue('Трансфер от Ладожского вокзала до Соснового Бора ' +
                                                  '(гостиницы) и обратно.');
    setTimeout(() => {
      document.querySelector('#transfer_anchor').scrollIntoView();
    }, 0);
  }

  transfertVitebsk() {
    console.log('transfertVitebsk');
    this.orderPay = true;
    this.sError = '';
    this.sResultEmail = '';
    this.transferForm.controls.wishes.setValue('Трансфер от Витебского вокзала до Соснового Бора ' +
                                                  '(гостиницы) и обратно.');

    setTimeout(() => {
        document.querySelector('#transfer_anchor').scrollIntoView();
      }, 0);
  }

  transfertPulkovo() {
    console.log('transferPulkovo');
    this.orderPay = true;
    this.sError = '';
    this.sResultEmail = '';
    this.transferForm.controls.wishes.setValue('Трансфер от аэропорта Пулково до Соснового Бора ' +
                                                  '(гостиницы) и обратно.');

    setTimeout(() => {
    document.querySelector('#transfer_anchor').scrollIntoView();
    }, 0);


  }

  transfert() {
    this.sError = '';
    this.sResultEmail = '';
    console.log('transfer');
    if (this.transferForm.controls.name.value === '') {
          this.sError = 'вы должны внести имя';
          return;
    }
    if (this.transferForm.controls.phone.value === '') {
      this.sError = 'вы должны внести телефон';
      return;
    }

    const odata = {Имя: this.transferForm.controls.name.value,
                   Фамилия: this.transferForm.controls.surname.value,
                   Email: this.transferForm.controls.email.value,
                   Телефон: this.transferForm.controls.phone.value,
                   Сообщение: this.transferForm.controls.wishes.value
                   };
    console.log('odata', odata);
    this.ts.sendEmail(odata).subscribe( value => {
       this.sResultEmail = value.toString();
    });

  }
}


