import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalRef} from './globalref';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient, public gr: GlobalRef) { }



}
