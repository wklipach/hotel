import { Component, OnInit, ViewChild } from '@angular/core';
import { EasycalendarComponent } from '../components/easycalendar/easycalendar.component';

import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

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


  constructor() { }

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


    this.galleryImages = [
      {
        small: 'assets/img/molodezhnaya72room1-thumb1.jpg',
        medium: 'assets/img/molodezhnaya72room1-thumb1.jpg',
        big: 'assets/img/molodezhnaya72room1-thumb1.jpg'
      },
      {
        small: 'assets/img/molodezhnaya72room1-thumb1.jpg',
        medium: 'assets/img/molodezhnaya72room1-thumb1.jpg',
        big: 'assets/img/molodezhnaya72room1-thumb1.jpg'
      },
      {
        small: 'assets/img/molodezhnaya72room1-thumb1.jpg',
        medium: 'assets/img/molodezhnaya72room1-thumb1.jpg',
        big: 'assets/img/molodezhnaya72room1-thumb1.jpg'
      },
      {
        small: 'assets/img/molodezhnaya72room1-thumb1.jpg',
        medium: 'assets/img/molodezhnaya72room1-thumb1.jpg',
        big: 'assets/img/molodezhnaya72room1-thumb1.jpg'
      },
      {
        small: 'assets/img/molodezhnaya72room1-thumb1.jpg',
        medium: 'assets/img/molodezhnaya72room1-thumb1.jpg',
        big: 'assets/img/molodezhnaya72room1-thumb1.jpg'
      },
      {
        small: 'assets/img/molodezhnaya72room1-thumb1.jpg',
        medium: 'assets/img/molodezhnaya72room1-thumb1.jpg',
        big: 'assets/img/molodezhnaya72room1-thumb1.jpg'
      },
      {
        small: 'assets/img/molodezhnaya72room1-thumb1.jpg',
        medium: 'assets/img/molodezhnaya72room1-thumb1.jpg',
        big: 'assets/img/molodezhnaya72room1-thumb1.jpg'
      },
      {
        small: 'assets/img/molodezhnaya72room1-thumb2.jpg',
        medium: 'assets/img/molodezhnaya72room1-thumb2.jpg',
        big: 'assets/img/molodezhnaya72room1-thumb2.jpg'
      },
      {
        small: 'assets/img/molodezhnaya72room1-middle2.jpg',
        medium: 'assets/img/molodezhnaya72room1-middle2.jpg',
        big: 'assets/img/molodezhnaya72room1-middle2.jpg'
      },
      {
        small: 'assets/img/molodezhnaya72room1-middle1.jpg',
        medium: 'assets/img/molodezhnaya72room1-middle1.jpg',
        big: 'assets/img/molodezhnaya72room1-middle1.jpg'
      }
    ];

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
    document.getElementById('textCalenarBegin'). textContent = strDate;
    this.boolBeginCalendar = false;

  }

  clickDayEnd(strDate) {
    this.endCalendar.clear();
    document.getElementById('textCalenarEnd'). textContent = strDate;
    this.boolEndCalendar = false;

  }

  addAdult() {
    this.numberOfAdults = this.numberOfAdults + 1;
  }

  deleteAdult() {

    if (this.numberOfAdults > 1) {
    this.numberOfAdults = this.numberOfAdults - 1;
    }

  }


  addChildren() {
    this.numberOfChildren = this.numberOfChildren + 1;
  }

  deleteChildren() {

    if (this.numberOfChildren > 0) {
        this.numberOfChildren = this.numberOfChildren - 1;
    }
  }

  findRooms() {
    console.log('найти комнаты');
  }


}