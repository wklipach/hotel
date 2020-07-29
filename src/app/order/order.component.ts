import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { GlobalRef } from '../services/globalref';
import { FormGroup, FormControl } from '@angular/forms';
import { analyzeFileForInjectables } from '@angular/compiler';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  sError = '';
  idCity = 1;
  addserv: any;
  orderForm: FormGroup;
  room: any;
  DateRoom: any;
  strInfoDate = '';
  strNight = 1;
  sPhoto = '';
  countAdult = 0;
  countChildren = 0;
  costWithoutServices = 0;
  totalCost = 0;
  listSelectedServices: any[] = []; // {id, name, count, price, cost};

  constructor(private os: OrderService,  public gr: GlobalRef,
              private auth: AuthService, private router: Router) {

    this.orderForm  = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      wishes: new FormControl(''),
      coupon: new FormControl('')
    });

   }

  ngOnInit(): void {
    this.os.getAdditionalServices(this.idCity).subscribe( (add: any[]) => {
      if (add) {
        add.forEach(elServ => {
          this.orderForm.addControl('addserv' + elServ.id, new FormControl(''));
        });
        this.addserv = add;
      }

    });

    // получаем данные о номере
    this.room = this.auth.getInfoNumber();

    // выводим фото номера
    if (this.room) {
      if (this.room.photo_mas) {
        if (this.room.photo_mas[0]) {
             this.sPhoto = this.room.photo_mas[0];
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

        this.os.setInsertOrder(idnumber, datebegin, dateend, iduser, coupon,
                                couponsuccess, totalrub, description ).subscribe( numberorder => {

          if (numberorder) {
            const id_order  = numberorder[0][0].id_order;
            console.log('id_order=', id_order, numberorder);
            // после получения заказа заносим услуги (даже если их нет возвращаем true)
            this.os.setAddService(id_order, this.listSelectedServices).subscribe( addserv => {
              if (addserv) {
                this.os.setDateToNumber(id_order, this.room.id, datebegin, dateend).subscribe( DateToNumber => {
                  console.log('!!!!!');
                  this.router.navigate(['/reservation']);
                });
              }
            });


          }
          });

      }
    });
  }


}