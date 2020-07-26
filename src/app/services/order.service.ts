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


}
