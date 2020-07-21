import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalRef} from './globalref';


@Injectable({
  providedIn: 'root'
})
export class ListGuideService {

  constructor(private http: HttpClient, public gr: GlobalRef) { }


  getGuideFeatures() {

    const varparams = new HttpParams()
    .set('get_guide_features', 'get_guide_features');

    return this.http.get(this.gr.sUrlGlobal + 'guide', {params: varparams});

  }

  getGuideBedstype() {

    const varparams = new HttpParams()
    .set('get_guide_bedstype', 'get_guide_bedstype');

    return this.http.get(this.gr.sUrlGlobal + 'guide', {params: varparams});

  }

  getGuideTypeprice() {
    const varparams = new HttpParams()
    .set('get_guide_typeprice', 'get_guide_typeprice');

    return this.http.get(this.gr.sUrlGlobal + 'guide', {params: varparams});
  }

  getGuideAddress(idCity: number) {
    const varparams = new HttpParams()
    .set('get_guide_address', 'get_guide_address')
    .set('id_city', idCity.toString());
    return this.http.get(this.gr.sUrlGlobal + 'guide', {params: varparams});
  }

  getGuideOneAddress(idAddress: number) {
    const varparams = new HttpParams()
    .set('get_one_address', 'get_one_address')
    .set('id_address', idAddress.toString());
    return this.http.get(this.gr.sUrlGlobal + 'guide', {params: varparams});
  }


}
