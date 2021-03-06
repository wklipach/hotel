import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalRef} from './globalref';

@Injectable({
  providedIn: 'root'
})
export class NumberService {

  constructor(private http: HttpClient, public gr: GlobalRef) { }

  insertNumber(paramInsert) {
    paramInsert.insert_number = 'insert_number';
    console.log(paramInsert);
    return this.http.post(this.gr.sUrlGlobal + 'number', paramInsert);
  }


  insertNumberFeature({ id_number, masFeature }: { id_number: number; masFeature: any; }) {
    const param = {insert_number_feature : 'insert_number_feature', id_number: id_number.toString(),
                  // tslint:disable-next-line: object-literal-shorthand
                  masFeature: masFeature};
    return this.http.post(this.gr.sUrlGlobal + 'number', param);
  }

  insertNumberBedstype(idnumber, masBedstype) {
    const param = {insert_number_bedstype : 'insert_number_bedstype', id_number: idnumber.toString(),
                  // tslint:disable-next-line: object-literal-shorthand
                  masBedstype: masBedstype};
    return this.http.post(this.gr.sUrlGlobal + 'number', param);
  }


  updateImageMessageTable(curMessage: any, curExt: string, idmessage: number, idprefix) {
    const datamessage = {message_image: curMessage, id_message: idmessage, id_prefix: idprefix, ext: curExt};
    return this.http.post(this.gr.sUrlGlobal + 'number', datamessage);
  }

  setDeleteNumber(idnumber) {
    const datamessage = {delete_number: idnumber.toString()};
    return this.http.post(this.gr.sUrlGlobal + 'number', datamessage);
  }


  getListNumber(idCity: number) {
    const varparams = new HttpParams()
      .set('get_list_number', 'get_list_number');
    return this.http.get(this.gr.sUrlGlobal + 'number', {params: varparams});
  }

  getNumberBedstype(idnumber) {
    const varparams = new HttpParams()
      .set('get_number_beds', 'get_number_beds')
      .set('id_number', idnumber);
    return this.http.get(this.gr.sUrlGlobal + 'number', {params: varparams});
  }

  getNumberFeature(idnumber) {
    const varparams = new HttpParams()
      .set('get_number_features', 'get_number_features')
      .set('id_number', idnumber);
    return this.http.get(this.gr.sUrlGlobal + 'number', {params: varparams});
  }

}
