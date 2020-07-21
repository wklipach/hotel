import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalRef} from './globalref';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient, public gr: GlobalRef) { }


  getGuideReservation() {

    const varparams = new HttpParams()
    .set('get_select_number', 'get_select_number');

    return this.http.get(this.gr.sUrlGlobal + 'reservation', {params: varparams});

  }

}
