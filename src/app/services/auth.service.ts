import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


// заносим номер комнаты в локальное хранилище
public setNumber(idnumber: number) {
  window.localStorage.setItem('id_number', JSON.stringify(idnumber));
  }

// стираем номер комнаты и информацию о номере из локального хранилища
public clearNumber() {
   window.localStorage.removeItem('id_number');
   window.localStorage.removeItem('infonumber');
}

// получаем номер комнаты из хранилища
public getNumber(): number {
  if (window.localStorage.getItem('id_number')) {
    return JSON.parse(window.localStorage.getItem('id_number'));
    } else {
    return -1;
  }
}

// заносим данные о комнате в локальное хранилище
public setInfoNumber(infonumber: any) {
  window.localStorage.setItem('infonumber', JSON.stringify(infonumber));
  }

  // заносим данные в строковом виде в локальное хранилище
  public  setInfoDate(strDateBegin, strDateEnd, DateBegin, DateEnd) {

    const DateRoom = {strDateBegin, strDateEnd, DateBegin, DateEnd};
    window.localStorage.setItem('DateRoom', JSON.stringify(DateRoom));
  }

// заносим количество гостей в хранилище
public  setInfoGuests(Adult, Children) {
  const InfoGuests = {Adult, Children};
  window.localStorage.setItem('InfoGuests', JSON.stringify(InfoGuests));
}

// получаем данные о комнате из хранилища
public getInfoNumber(): any {
  if (window.localStorage.getItem('infonumber')) {
    return JSON.parse(window.localStorage.getItem('infonumber'));
    } else {
    return {};
  }
}

// получаем данные о датах из хранилища
public getInfoDate(): any {
  if (window.localStorage.getItem('DateRoom')) {
    return JSON.parse(window.localStorage.getItem('DateRoom'));
    } else {
    return {};
  }
}

// получаем количество гостей из хранилища
getInfoGuests(): any {
  if (window.localStorage.getItem('InfoGuests')) {
    return JSON.parse(window.localStorage.getItem('InfoGuests'));
    } else {
    return {Adult: 1, Children: 0};
  }
}

}
