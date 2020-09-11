import { Component, OnInit } from '@angular/core';
import {TransferService} from '../services/transfer.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  sErrorPhone = '';
  constructor(private ts: TransferService) { }

  ngOnInit(): void {
  }

  clickPhone() {
    (document.getElementById('inputPhoneName') as HTMLInputElement).value = '';
    (document.getElementById('inputPhoneNumber') as HTMLInputElement).value = '';

    const modalWindow = document.getElementById('openModalButton');
    modalWindow.click();
  }

  onYesCallClick() {

    this.sErrorPhone = '';
    const sName = (document.getElementById('inputPhoneName') as HTMLInputElement).value.trim();
    const sPhone = (document.getElementById('inputPhoneNumber') as HTMLInputElement).value.trim();

    if (!sName) {
      this.sErrorPhone = 'введите имя';
      return;
    }

    if (!sPhone) {
      this.sErrorPhone = 'введите номер телефона';
      return;
    }

    document.getElementById('closeModalButton').click();


    const odata = {
      Заказ: 'Данный клиент просит перезвонить',
      Имя: sName,
      Телефон: sPhone,
      subject: 'Заказан звонок от ' + sPhone
    };
    console.log('odata', odata);
    this.ts.sendEmail(odata).subscribe( value => {
      // this.sResultEmail = value.toString();
    });
  }
}
