import { Injectable } from '@angular/core';
import { GlobalRef } from './globalref';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PamentService {

  constructor(private http: HttpClient, public gr: GlobalRef) { }

  processPayment(idorder, amount) {
    const datamessage = {post_payment: 'post_payment', id_order: idorder, amount};
    return this.http.post(this.gr.sUrlGlobal + 'payment', datamessage, {responseType: 'text' });
  }

}
