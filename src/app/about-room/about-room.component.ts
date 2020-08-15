import { Component, OnInit, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { EasycalendarComponent } from '../components/easycalendar/easycalendar.component';

import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { AuthService } from '../services/auth.service';
import { GlobalRef } from '../services/globalref';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-about-room',
  templateUrl: './about-room.component.html',
  styleUrls: ['./about-room.component.css']
})
export class AboutRoomComponent implements OnInit, AfterViewInit {

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
  arCheckedDate = [];
  boolRules = false;


  test() {
    console.log('a1');


  }

  constructor(private auth: AuthService,
              private gr: GlobalRef,
              private router: Router,
              private os: OrderService,
              private renderer: Renderer2) {

                this.renderer.listen('window', 'click', (e: Event) => {

                  const elemNext = document.getElementById('imgEasyCalendarNext');
                  const elemPrev =  document.getElementById('imgEasyCalendarPrev');

                  if (this.boolBeginCalendar && e.target !== document.getElementById('iconCalendarBegin') &&
                  e.target !== elemNext && e.target !== elemPrev) {
                  this.boolBeginCalendar = false;
                  }

                  if (this.boolEndCalendar && e.target !== document.getElementById('iconCalendarEnd') &&
                      e.target !== elemNext && e.target !== elemPrev) {
                    this.boolEndCalendar = false;
                }

              });

              }

              ngAfterViewInit() {
                const elemNext = document.getElementById('imgEasyCalendarNext');
                const elemPrev =  document.getElementById('imgEasyCalendarPrev');
              }

  ngOnInit(): void {

    this.galleryOptions = [
      {
        width: '649px',
        height: '545px',
        thumbnailsColumns: 10,
        thumbnailsPercent: 14,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '649px',
        height: '408px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 200,
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

    this.reloadBooking(new Date());


  }

  clickIconBeginCalendar() {
    this.boolBeginCalendar = !this.boolBeginCalendar;
    console.log('this.boolBeginCalendar', this.boolBeginCalendar);
  }

  clickIconEndCalendar() {
    this.boolEndCalendar = !this.boolEndCalendar;
  }


  clickDayBegin(strDate) {

    const dDateBegin = this.toDate(strDate);
    dDateBegin.setHours(0, 0, 0, 0);
    const curDate = new Date();
    curDate.setHours(0, 0, 0, 0);
    this.beginCalendar.clear();

    if (curDate > dDateBegin) {
      document.getElementById('textCalenarBegin').textContent = 'Заезд';
      this.boolBeginCalendar = false;
      return;
    }

    document.getElementById('textCalenarBegin').textContent = strDate;
    this.boolBeginCalendar = false;
    this.boolEndCalendar = true;

  }

  clickDayEnd(strDate) {

    const dDateEnd = this.toDate(strDate);
    dDateEnd.setHours(0, 0, 0, 0);
    const curDate = new Date();
    curDate.setHours(0, 0, 0, 0);
    this.endCalendar.clear();

    if (curDate > dDateEnd) {
      document.getElementById('textCalenarEnd').textContent = 'Выезд';
      this.boolEndCalendar = false;
      return;
    }

    document.getElementById('textCalenarEnd').textContent = strDate;
    this.boolEndCalendar = false;

  }

  clickCalendarBook(d: Date) {
      this.reloadBooking(d);
  }


  reloadBooking(d: Date) {
    if (!this.room) {
      if (!this.room.id) {
        return;
      }
    }
    this.os.getBookingNumber(this.room.id, d.getMonth() + 1, d.getFullYear()).subscribe( (booking: any[]) => {
        const barr = [];
        booking.forEach(b => {
          barr.push(b.date_str);
        });
        this.arCheckedDate = barr;
    });
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

    if (dDateEnd <= dDateBegin) {
      this.sError = 'Исправьте даты в периоде';
      return;
    }

    // проверка - не являются ли какие-то даты уже зарезервированными
    const dValDateBegin = new Date(dDateBegin);
    let boolBooking = false;
    while (dValDateBegin < dDateEnd) {
      const datestr = this.DateToStr(dValDateBegin);

      const promArr = this.arCheckedDate.find(elem => {
        console.log('elem=', elem, datestr);
        return datestr === elem;
        });

      console.log('promArr=', promArr);
      if (promArr) {

        boolBooking = true;
      }
      dValDateBegin.setDate(dValDateBegin.getDate() + 1);
    }

    if (boolBooking) {
      this.sError = 'В период попали забронированные даты.';
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

   DateToStr(d: Date) {
    const dd = d.getDate();
    const mm = d.getMonth() + 1;
    const yyyy = d.getFullYear();
    let sDD = dd.toString();
    let sMM = mm.toString();

    if (dd < 10) {
      sDD = '0' + dd.toString();
    }
    if (mm < 10) {
      sMM = '0' + mm.toString();
    }
    return sDD + '.' + sMM + '.' + yyyy;
  }


  clickRules() {
    this.boolRules = !this.boolRules;
  }
}
