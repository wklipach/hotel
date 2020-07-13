import { Component, OnInit, ViewChild } from '@angular/core';
import { EasycalendarComponent } from '../components/easycalendar/easycalendar.component';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  @ViewChild('beginCalendar') beginCalendar: EasycalendarComponent;
  @ViewChild('endCalendar') endCalendar: EasycalendarComponent;

  boolBeginCalendar = false;
  boolEndCalendar = false;
  numberOfAdults = 1;
  numberOfChildren = 0;
  roomsArray = [];

  constructor() { }

  ngOnInit(): void {
    this.roomsArray = new Array(10);
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
