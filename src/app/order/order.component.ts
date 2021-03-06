import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { GlobalRef } from '../services/globalref';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { analyzeFileForInjectables } from '@angular/compiler';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { PamentService } from '../services/pament.service';
import { Base64 } from 'js-base64';
import SHA1 from 'crypto-js/sha1';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  sError = '';
  idCity = 1;
  addserv: any;
  servicegroup: any;
  orderForm: FormGroup;
  room: any;
  DateRoom: any;
  strInfoDate = '';
  strNight = 1;
  sPhoto = '';
  sPhotoPointer = 1;
  countAdult = 0;
  countChildren = 0;
  costWithoutServices = 0;
  totalCost = 0;
  boolRules = false;
  boolPayInfo = false;
  boolCashless = false;
  boolArrServGroup: boolean [];
  listSelectedServices: any[] = []; // {id, name, count, price, cost};

  bankData = {
    amount: '0',
    order_id: '',
    description: '',
    unix_timestamp: '',
    testing: '',
    merchant: '',
    success_url: '',
    signature: ''
  };


  orderid = '';
  description = '';
  success_url = '';

  constructor(private os: OrderService,  public gr: GlobalRef,
              private ps: PamentService, private auth: AuthService, private router: Router) {

    this.orderForm  = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      wishes: new FormControl(''),
      coupon: new FormControl(''),
      cashless: new FormControl('')
    });

   }

  ngOnInit(): void {

    this.boolArrServGroup = [];
    this.os.getAdditionalGroupServices().subscribe( (servicegroup: any[]) => {
          servicegroup.forEach(elServGroup => {
          this.orderForm.addControl('addservgroup' + elServGroup.id_group, new FormControl(''));
          this.boolArrServGroup.push(false);
          });
          this.servicegroup = servicegroup;

          this.os.getAdditionalServices(this.idCity).subscribe( (add: any[]) => {
            if (add) {
              add.forEach(elServ => {
              this.orderForm.addControl('addserv' + elServ.id, new FormControl(''));
              });
              this.addserv = add;
              console.log(this.addserv);
          }
          });
    });

    // получаем данные о номере
    this.room = this.auth.getInfoNumber();

    // выводим фото номера
    if (this.room) {
      if (this.room.photo_mas) {
        if (this.room.photo_mas[0]) {
             this.sPhoto = this.room.photo_mas[0];
             this.sPhotoPointer = 1;
        }
      }
    }

    // получаем даты номера
    this.DateRoom = this.auth.getInfoDate();
    this.strInfoDate = this.DateRoom.strDateBegin + '-' + this.DateRoom.strDateEnd;

    // число ночей
    this.strNight = this.dateBetweenDay(new Date(this.DateRoom.DateBegin), new Date(this.DateRoom.DateEnd));

    // получаем число гостей
    const countGuests = this.auth.getInfoGuests();
    this.countAdult = countGuests.Adult;
    this.countChildren = countGuests.Children;

    // получаем стоимость номера пробегаясь по всем дням в цикле
    this.costWithoutServices = this.CostByDday(new Date(this.DateRoom.DateBegin),
                                               new Date(this.DateRoom.DateEnd),
                                               Number(this.room.price_weekdays),
                                               Number(this.room.price_weekend));
    this.totalCost = this.costWithoutServices;

  }

  CostByDday(DateBegin, DateEnd, PriceWeekdays, PriceWeekend) {
    // getDay() => Вернуть день недели от 0 (воскресенье) до 6 (суббота)...
    const dBegin = new Date(DateBegin);
    let cost = 0;

    while (dBegin < DateEnd) {
      if (dBegin.getDay() === 5 ||  dBegin.getDay() === 6) {
        cost = cost + PriceWeekend;
      } else {
        cost = cost + PriceWeekdays;
      }
      dBegin.setDate(dBegin.getDate() + 1);
    }

    return cost;
  }

  clickCheckElementGroup($event, id, name) {

    this.boolArrServGroup[id - 1] = !this.boolArrServGroup[id - 1];
    // console.log('this.boolArrServGroup[id-1]', this.boolArrServGroup[id - 1], id);
  }
  clickCheckElement($event,  id, curName, curPrice) {
    const res = this.orderForm.controls['addserv' + id].value;

    if (Boolean(res)) {
     const filterArray = this.listSelectedServices.filter( value => value.id === id);
     if (filterArray.length === 0) {
      this.listSelectedServices.push({id, name: curName, count: 1, price: curPrice, cost: curPrice});
     }
   } else {
    this.listSelectedServices = this.listSelectedServices.filter( value => value.id !== id);
   }

    this.itogoOrder();
  }


  clickAmountElementUp(id, name, price) {

    let res = this.orderForm.controls['addserv' + id].value;
    if (res === '') {
      this.orderForm.controls['addserv' + id].setValue(1);
      this.addAddServ(id, name, 1, price);
      return;
    }

    if (res.toString() !== '0'.toString() && !Number(res)) {
      this.orderForm.controls['addserv' + id].setValue(0);
      this.addAddServ(id, name, 0, price);
      return;
    }


    if (Number(res) < 0) {
      this.orderForm.controls['addserv' + id].setValue(0);
      this.addAddServ(id, name, 0, price);
      return;
    }

    res = Number(res) + 1;
    this.orderForm.controls['addserv' + id].setValue(Number(res));

    // задаем новое количество услуги
    this.addAddServ(id, name, Number(res), price);
  }

  clickAmountElementDawn(id, name, price) {
    let res = this.orderForm.controls['addserv' + id].value;
    if (res === '') {
      this.orderForm.controls['addserv' + id].setValue(0);
      this.addAddServ(id, name, 0, price);
      return;
    }

    if (!Number(res)) {
      this.orderForm.controls['addserv' + id].setValue(0);
      this.addAddServ(id, name, 0, price);
      return;
    }

    if (Number(res) < 0) {
      this.orderForm.controls['addserv' + id].setValue(0);
      this.addAddServ(id, name, 0, price);
      return;
    }

    res = Number(res) - 1;
    this.orderForm.controls['addserv' + id].setValue(Number(res));

    // задаем новое количество услуги
    if (res.toString() === '0') {
      this.addAddServ(id, name, 0, price);
    } else {
      this.addAddServ(id, name, Number(res), price);
    }
  }


  clickAmountElement($event, id, name, price) {
    const res = this.orderForm.controls['addserv' + id].value;
    if (res === '') {
      this.orderForm.controls['addserv' + id].setValue(0);
      this.addAddServ(id, name, 0, price);
      return;
    }

    if (!Number(res)) {
      this.orderForm.controls['addserv' + id].setValue(0);
      this.addAddServ(id, name, 0, price);
      return;
    }

    if (Number(res) < 0) {
      this.orderForm.controls['addserv' + id].setValue(0);
      this.addAddServ(id, name, 0, price);
      return;
    }

    // убираем незначащие символы типа 0 впереди
    this.orderForm.controls['addserv' + id].setValue(Number(res));

    // задаем новое количество услуги
    this.addAddServ(id, name, Number(res), price);
    }

  addAddServ(id, name, count, price) {

   // если количество равно ноль удаляем элемент из массива
    if (count === 0) {
    this.listSelectedServices = this.listSelectedServices.filter( value => value.id !== id);
    this.itogoOrder();
    return;
    }

   // если количество не равно ноль меняем количество
    if (count > 0) {
    const FilteredArray = this.listSelectedServices.filter( value => value.id === id);
    if (FilteredArray.length > 0 ) {
      this.listSelectedServices.forEach( xx1 => {
        if (xx1.id === id) {
          xx1.count = count;
          xx1.name = name;
          xx1.price = price;
          xx1.cost = price * count;
        }
      });
    }
    if (FilteredArray.length === 0 ) {
      this.listSelectedServices.push({id, name, count, price, cost: price * count});
    }

    }

    console.log('this.itogoOrder()');
    this.itogoOrder();

  }


  // разница в днях между двумя датами
  dateBetweenDay(dBegin, dEnd) {
     return Math.ceil(Math.abs(dEnd.getTime() - dBegin.getTime()) / (1000 * 3600 * 24));
  }

  itogoOrder() {
     let cost = 0;
     this.listSelectedServices.forEach(value => {
       cost = cost + value.cost;
     });

     this.totalCost = cost + this.costWithoutServices;
  }


  apply() {


    // получаем имя фамилию и емайл
   this.sError = '';
   const name = this.orderForm.controls.name.value;
   const surname = this.orderForm.controls.surname.value;
   const email = this.orderForm.controls.email.value;
   const phone = this.orderForm.controls.phone.value;
   const orderdescription = this.orderForm.controls.wishes.value;

   if (!name || name === '') {
    this.sError = 'Введите ваше имя.';
    return;
   }

   if (!surname || surname === '') {
    this.sError = 'Введите вашу фамилию.';
    return;
   }

   if (!surname || surname === '') {
    this.sError = 'Введите ваш email.';
    return;
   }

   if (!phone || phone === '') {
    this.sError = 'Введите ваш телефон.';
    return;
   }

    // SELECT id AS id_user FROM tuser WHERE ifnull(bitDelete,0)=0 and name='' and surname='' and phone=''
   this.os.getUserToOrder(name, surname, email, phone).subscribe( (finduser: any[]) => {
      const id_user = finduser[0][0].id_user;

      console.log('id_user=', id_user, finduser);

      // вносим заказ
      if (id_user) {

        const idnumber = this.room.id;
        const datebegin = new Date(this.DateRoom.DateBegin);

        const dateend = new Date(this.DateRoom.DateEnd);

        const iduser = id_user;
        const coupon = this.orderForm.controls.coupon.value;
        const couponsuccess = false;
        const totalrub = this.totalCost;
        const description = orderdescription;
        let deposit = 0;
        const guest = this.countAdult; 
        const children = this.countChildren;
        if (this.room.price_weekdays) {
          deposit = this.room.price_weekdays;
        }

        this.os.setInsertOrder(idnumber, datebegin, dateend, iduser, coupon,
                                couponsuccess, totalrub, description, this.boolCashless, deposit, guest, children).subscribe( numberorder => {

          if (numberorder) {
            const id_order  = numberorder[0][0].id_order;
            console.log('id_order=', id_order, numberorder);
            // после получения заказа заносим услуги (даже если их нет возвращаем true)
            console.log('listSelectedServices=', this.listSelectedServices);
            this.os.setAddService(id_order, this.listSelectedServices).subscribe( addserv => {
              if (addserv) {
                this.os.setDateToNumber(id_order, this.room.id, datebegin, dateend).subscribe( DateToNumber => {

                    // после того как завели заказ начинаем процесс оплаты
                  if (!this.boolCashless) {

                    /*
                    this.ps.processPayment(id_order, totalrub).subscribe( valuePay => {
                     document.location.href = 'https://pay.modulbank.ru/pay';
                    });
                    */
                   this.orderid = 'Заказ №' + id_order.toString();
                   this.description = this.room.name + ' ' + this.strInfoDate;
                   const codeOrder =  Base64.encodeURI(id_order);
                   this.success_url = this.gr.sUrlAngular + 'itog-oplaty/?id_order=' + codeOrder;
                   this.moveDate();
                   document.getElementById('modulBankWithLove').click();

                   }

                  if (this.boolCashless) {

                   const codeOrder =  Base64.encodeURI(id_order);
                   console.log('codeOrder=', codeOrder);
                   // Base64.decode()
                   this.router.navigate(['/itog-oplaty/.'], { queryParams:  {id_order: codeOrder} , skipLocationChange: true });
                  }

                });
              }
            });


          }
          });

      }
    });
  }

  clickUpPhoto() {
    if (this.room) {
      if (this.room.photo_mas) {
              if (this.room.photo_mas.length > this.sPhotoPointer) {
                this.sPhotoPointer = this.sPhotoPointer + 1;
                this.sPhoto = this.room.photo_mas[this.sPhotoPointer - 1];
              }
      }
    }
  }

  clickDawnPhoto() {
    if (this.room) {
      if (this.room.photo_mas) {
        if (this.sPhotoPointer > 1) {
          this.sPhotoPointer = this.sPhotoPointer - 1;
          this.sPhoto = this.room.photo_mas[this.sPhotoPointer - 1];
        }
      }
    }
  }

  clickRules() {
    this.boolRules = !this.boolRules;
  }

  clickPayInfo() {
    this.boolPayInfo = !this.boolPayInfo;
  }


  getImageForGroup(id) {
    if (this.boolArrServGroup[id - 1]) {
      // открыто
      // return 'caret-up-square.svg';
      return 'chevron-up.svg';
    } else {
      // закрыто
      // return 'caret-down-square.svg';
      return 'chevron-down.svg';
    }
  }

  GetSignature(secretKey, formData) {
    const values = Object.keys(formData)
      .filter(key => key !== 'signature')
      .filter(key => formData[key] !== '')
      .sort()
      .map(key => `${key}=${Base64.encode(formData[key])}`)
      .join('&');
  /* Двойное шифрование sha1 на основе секретного ключа */
    const signature = SHA1(secretKey + SHA1(secretKey + values));
    return signature.toString();
  }

  moveDate() {
    const UNIX_TIMESTAMP = Math.round(new Date().getTime() / 1000).toString();

    this.bankData.amount = this.totalCost.toString();
    this.bankData.order_id = this.orderid;
    this.bankData.description = this.description;
    this.bankData.unix_timestamp = UNIX_TIMESTAMP;
    this.bankData.testing = '1';
    this.bankData.merchant = '4590e689-c84e-43ec-83f5-6f5c0f8e9063';
    this.bankData.success_url = this.success_url;  // 'https://pay.modulbank.ru/success';
    this.bankData.signature = this.GetSignature('F79781A25F203661CFECE9EE1EFFC2F0', this.bankData);
//    console.log('данные для передачи = ');
//    console.log(this.bankData);
    (document.getElementById('amount') as HTMLInputElement).value = this.bankData.amount;
    (document.getElementById('order_id') as HTMLInputElement).value = this.bankData.order_id;
    (document.getElementById('description') as HTMLInputElement).value = this.bankData.description;
    (document.getElementById('unix_timestamp') as HTMLInputElement).value = this.bankData.unix_timestamp;
    (document.getElementById('testing') as HTMLInputElement).value = this.bankData.testing;
    (document.getElementById('merchant') as HTMLInputElement).value = this.bankData.merchant;
    (document.getElementById('success_url') as HTMLInputElement).value = this.bankData.success_url;
    (document.getElementById('signature') as HTMLInputElement).value = this.bankData.signature;
  }


}
