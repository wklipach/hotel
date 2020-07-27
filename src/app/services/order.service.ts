import { Injectable } from '@angular/core';
import { GlobalRef } from './globalref';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, public gr: GlobalRef) { }


  getAdditionalServices(idCity: number) {
    const varparams = new HttpParams()
    .set('get_additional_services', 'get_additional_services')
    .set('id_city', idCity.toString());
    return this.http.get(this.gr.sUrlGlobal + 'order', {params: varparams});
  }

  getUserToOrder(name: string, surname: string, email: string, phone: string) {
      const varparams = new HttpParams()
      .set('get_user_toorder', 'get_user_toorder')
      .set('name', name)
      .set('surname', surname)
      .set('email', email)
      .set('phone', phone);
      return this.http.get(this.gr.sUrlGlobal + 'order', {params: varparams});
  }

  setInsertOrder(idnumber: number, datebegin: Date, dateend: Date, iduser: number,
                 coupon: string, couponsuccess: boolean,
                 totalrub: number, description: string) {

                  console.log('datebegin=', datebegin);


                  const isoDateBegin = new Date(datebegin.getTime() - (datebegin.getTimezoneOffset() * 60000)).toISOString();
                  const isoDateEnd = new Date(dateend.getTime() - (dateend.getTimezoneOffset() * 60000)).toISOString();


                  const datamessage = {insert_order: 'insert_order', id_number: idnumber,
                         date_begin: isoDateBegin, date_end: isoDateEnd,
                         id_user: iduser, coupon, coupon_success: couponsuccess,
                         total_rub: totalrub,
                         description};
                  return this.http.post(this.gr.sUrlGlobal + 'order', datamessage);

}

setAddService(idnumber, addserv: any) {

   const datamessage = {insert_addserv: 'insert_addserv', id_number: idnumber, addserv};
   return this.http.post(this.gr.sUrlGlobal + 'order', datamessage);
}

setDateToNumber(idorder, idnumber, datebegin, dateend)  {
  const datamessage = {insert_datetonumber: 'insert_datetonumber',
                       id_order: idorder,
                       id_number: idnumber,
                       date_begin: datebegin,
                       date_end: dateend};
  return this.http.post(this.gr.sUrlGlobal + 'order', datamessage);
}


}
