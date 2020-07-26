import { Component, OnInit, ViewChild } from '@angular/core';
import { EasycalendarComponent } from '../components/easycalendar/easycalendar.component';

import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { AuthService } from '../services/auth.service';
import { GlobalRef } from '../services/globalref';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-room',
  templateUrl: './about-room.component.html',
  styleUrls: ['./about-room.component.css']
})
export class AboutRoomComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  @ViewChild('beginCalendar') beginCalendar: EasycalendarComponent;
  @ViewChild('endCalendar') endCalendar: EasycalendarComponent;

  boolBeginCalendar = false;
  boolEndCalendar = false;
  numberOfAdults = 1;
  numberOfChildren = 0;
  room: any;
  sError = '';


  constructor(private auth: AuthService, private gr: GlobalRef, private router: Router) { }

  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: '649px',
        height: '408px',
        thumbnailsColumns: 10,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.room = this.auth.getInfoNumber();


    const varPhoto: NgxGalleryImage[] = [];

    if (this.room.photo_mas) {
    this.room.photo_mas.forEach(element => {
      varPhoto.push({
        small: this.gr.sUrlImageGlobal + element,
        medium: this.gr.sUrlImageGlobal + element,
        big: this.gr.sUrlImageGlobal + element
      });
    });
  } else {
    varPhoto.push({
      small: '../../assets/img/intro-image.jpg',
      medium: '../../assets/img/intro-image.jpg',
      big: '../../assets/img/intro-image.jpg'
    });

  }

    this.galleryImages = varPhoto;


  }

  clickIconBeginCalendar() {
    this.boolBeginCalendar = !this.boolBeginCalendar;
    console.log('this.boolBeginCalendar', this.boolBeginCalendar);
  }

  clickIconEndCalendar() {
    this.boolEndCalendar = !this.boolEndCalendar;
  }


  clickDayBegin(strDate) {
    this.beginCalendar.clear();
    document.getElementById('textCalenarBegin').textContent = strDate;
    this.boolBeginCalendar = false;

  }

  clickDayEnd(strDate) {
    this.endCalendar.clear();
    document.getElementById('textCalenarEnd').textContent = strDate;
    this.boolEndCalendar = false;

  }

  addAdult() {

   // количество взрослых не должно быть больше разрешенного
   if (this.room.guests && Number(this.room.guests)) {
    const maxAdults = Number(this.room.guests);
    if (this.numberOfAdults < maxAdults) {
        this.numberOfAdults = this.numberOfAdults + 1;
    }
    return;
  }

   this.numberOfAdults = this.numberOfAdults + 1;
  }

  deleteAdult() {

    if (this.numberOfAdults > 1) {
    this.numberOfAdults = this.numberOfAdults - 1;
    }

  }


  addChildren() {
   // количество детей не должно быть больше разрешенного
   if (this.room.children && Number(this.room.children)) {
     const maxChildren = Number(this.room.children);
     if (this.numberOfChildren < maxChildren) {
         this.numberOfChildren = this.numberOfChildren + 1;
     }
     return;
   }
   this.numberOfChildren = this.numberOfChildren + 1;
  }

  deleteChildren() {

    if (this.numberOfChildren > 0) {
        this.numberOfChildren = this.numberOfChildren - 1;
    }
  }

  findRooms() {

    const strDateBegin = document.getElementById('textCalenarBegin').textContent;
    const strDateEnd = document.getElementById('textCalenarEnd').textContent;

    this.sError = '';
    const dDateBegin = this.toDate(strDateBegin);
    if (!this.isValidDate(dDateBegin)) {
      this.sError = 'Введите дату заезда';
      return;
     }

    const dDateEnd = this.toDate(strDateEnd);
    if  (!this.isValidDate(dDateEnd)) {
      this.sError = 'Введите дату выезда';
      return;
    }

    if (dDateEnd < dDateBegin) {
      this.sError = 'Исправьте даты в периоде';
      return;

    }

    this.auth.setInfoDate(strDateBegin, strDateEnd, dDateBegin, dDateEnd);
    this.auth.setInfoGuests(this.numberOfAdults, this.numberOfChildren);
    this.router.navigate(['/order']);

  }

  toDate(dateStr) {
    const parts = dateStr.split('.');
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }

  isValidDate(d) {
    return d instanceof Date && !isNaN( d.getTime());
  }


}
