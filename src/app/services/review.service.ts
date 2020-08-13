import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalRef } from './globalref';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient, public gr: GlobalRef) { }

/*
  getGuideReservation() {
    const varparams = new HttpParams()
    .set('get_select_number', 'get_select_number');
    return this.http.get(this.gr.sUrlGlobal + 'reservation', {params: varparams});
  }
*/

setReview(iduser, review)  {
  const datareview = {insert_review: 'insert_review',
                       id_user: iduser,
                       review};
  return this.http.post(this.gr.sUrlGlobal + 'review', datareview);
}

getUserReview(iduser) {
  const varparams = new HttpParams()
  .set('get_user_review', 'get_user_review')
  .set('id_user', iduser);
  return this.http.get(this.gr.sUrlGlobal + 'review', {params: varparams});
}

getAllReview() {
  const varparams = new HttpParams()
  .set('get_review', 'get_review');
  return this.http.get(this.gr.sUrlGlobal + 'review', {params: varparams});
}

deleteReview(id) {
  const datareview = {delete_review: 'delete_review',
                       id};
  return this.http.post(this.gr.sUrlGlobal + 'review', datareview);
}

setUpdateReview(id, review) {
  const datareview = {update_review: 'update_review',
                       id,
                       review};
  return this.http.post(this.gr.sUrlGlobal + 'review', datareview);
}

}
