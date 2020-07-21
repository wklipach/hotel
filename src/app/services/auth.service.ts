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

// получаем данные о комнате из хранилища
public getInfoNumber(): any {
  if (window.localStorage.getItem('infonumber')) {
    return JSON.parse(window.localStorage.getItem('infonumber'));
    } else {
    return {};
  }
}



}
