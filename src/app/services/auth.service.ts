import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { GlobalRef } from './globalref';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line: variable-name

  getCheckEmailWithoutCurrentUser(email: string, iduser: number) {
    const params = new HttpParams()
      .set('email_without_user', email)
       .set('email_without_iduser', iduser.toString());
    return this.http.get(this.gr.sUrlGlobal + 'users', {params});
  }

  constructor(private http: HttpClient, public gr: GlobalRef) { }


// заносим номер комнаты в локальное хранилище
public setNumber(idnumber: number) {
  window.localStorage.setItem('id_number', JSON.stringify(idnumber));
  }

  public setEditNumber(idnumber: number) {
    window.localStorage.setItem('id_edit_number', JSON.stringify(idnumber));
  }

  public getEditNumber(): number {
    if (window.localStorage.getItem('id_edit_number')) {
      return JSON.parse(window.localStorage.getItem('id_edit_number'));
    } else {
      return -1;
    }
  }


// стираем номер комнаты и информацию о номере из локального хранилища
public clearNumber() {
   window.localStorage.removeItem('id_number');
   window.localStorage.removeItem('infonumber');
}

// получаем номер пользователя из хранилища
public getIdUserStorage(): number {
  if (window.localStorage.getItem('id_user_hotel')) {
    return JSON.parse(window.localStorage.getItem('id_user_hotel'));
    } else {
    return -1;
  }
}

// hotelEditor:"0"
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

  // получаем пользователя, поиск по 2 полям - его почте и нику одновременно
  getUserFromBase(UserName: string) {
    const params = new HttpParams()
     .set('get_user', UserName.toString());
    return this.http.get(this.gr.sUrlGlobal + 'users', {params});
 }

 updatePassword(password: string, iduser: number) {
  const updatepassword = { update_password: password, id_user: iduser};
  return this.http.post(this.gr.sUrlGlobal + 'users', updatepassword);
}

updateUser(postUser, iduser: number) {
  const updateuser = { post_user: postUser, id_user: iduser};
  return this.http.post(this.gr.sUrlGlobal + 'users', updateuser);
}

   // стираем текущего пользователя из локального хранилища
   public clearUserStorage() {
    window.localStorage.setItem('hotelUserName', '');
    window.localStorage.setItem('id_user_hotel', JSON.stringify(-1));
    window.localStorage.setItem('hotelEditor', JSON.stringify(-1));
 }

 // заносим текущего пользователя в локальное хранилище
 public setUserStorage(hotelUserName: string, idUserHotel: number, hotelEditor: number) {
  window.localStorage.setItem('hotelUserName', hotelUserName);
  window.localStorage.setItem('id_user_hotel', JSON.stringify(idUserHotel));
  window.localStorage.setItem('hotelEditor', JSON.stringify(hotelEditor));
}

 // получаем текущего пользователя из локального хранилище
 public loginUserStorage() {

  if (window.localStorage.getItem('id_user_hotel')) {
    return { id_user_hotel: window.localStorage.getItem('id_user_hotel'),
             hotelUserName: window.localStorage.getItem('hotelUserName'),
             hotelEditor: window.localStorage.getItem('hotelEditor')
           };
    } else {
    return {id_user_hotel: -1, hotelUserName: '', hotelEditor: -1};
  }

}


getPhoneUserTable(phone: string) {
  const params = new HttpParams()
    .set('get_phone_user', phone.toString());
  return this.http.get(this.gr.sUrlGlobal + 'users', {params});
}

  // получаем пользователя по почтовому адресу
  getEmailUserTable(email: string) {
    const params = new HttpParams()
      .set('get_email_user', email.toString());
    return this.http.get(this.gr.sUrlGlobal + 'users', {params});
  }

  setNewUser(NewUser, curSubject, curLetter) {
    // вставить запрос по добавлению пользователя в базу
    const user = { new_user : 'new_user',
                   phone: NewUser.phone,
                   email: NewUser.email,
                   password: NewUser.password,
                   subject: curSubject,
                   letter: curLetter};
    return this.http.post(this.gr.sUrlGlobal + 'users', user);
  }

  // заносим текущего пользователя в локальное хранилище
  public setUserId(idUser: number) {
    window.localStorage.setItem('id_user_hotel', JSON.stringify(idUser));
  }

  getEditorStorage() {
    if (window.localStorage.getItem('hotelEditor')) {
       return  JSON.parse(window.localStorage.getItem('hotelEditor'));
     } else  {
       return -1;
     }
  }

  getUserFromId(idUser) {
    const params = new HttpParams()
      .set('get_id_user', idUser.toString());
    return this.http.get(this.gr.sUrlGlobal + 'users', {params});
  }

  updateAvatarUserTable(curAvatar: any, iduser: number) {
    const dataavatar = {avatar: curAvatar, id_user : iduser};
    return this.http.post(this.gr.sUrlGlobal + 'users', dataavatar);
  }

  clearAvatarUserTable(iduser: number) {
    const dataavatar = { clear_avatar: 'clear_avatar', id_user : iduser};
    return this.http.post(this.gr.sUrlGlobal + 'users', dataavatar);
  }

}
