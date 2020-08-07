import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalRef} from './globalref';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient, public gr: GlobalRef) { }

  sendEmail(odata) {
    odata.odata = 'odata';
    return this.http.post(this.gr.sUrlGlobal + 'transfer', odata);
  }
}
