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

}
