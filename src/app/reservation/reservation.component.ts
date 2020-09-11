import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { EasycalendarComponent } from '../components/easycalendar/easycalendar.component';
import { ReservationService } from '../services/reservation.service';
import { GlobalRef } from '../services/globalref';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

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
  sUrlImage = '';
  sError = '';
  bFind = false;

  sddBegin = '';
  sddEnd = '';
  daysLag = 0;

  mistakeDateClick = false;

  constructor(private rs: ReservationService, private gr: GlobalRef,
              private auth: AuthService,  private router: Router,
              private renderer: Renderer2) {
    this.sUrlImage = gr.sUrlImageGlobal;


    this.renderer.listen('window', 'click', (e: Event) => {


      const elemNext = document.getElementById('imgEasyCalendarNext');
      const elemPrev =  document.getElementById('imgEasyCalendarPrev');

      if (!this.mistakeDateClick && this.boolBeginCalendar && e.target !== document.getElementById('iconCalendarBegin') &&
            e.target !== elemNext && e.target !== elemPrev) {
            this.boolBeginCalendar = false;
        }

      if (!this.mistakeDateClick && this.boolEndCalendar && e.target !== document.getElementById('iconCalendarEnd') &&
          e.target !== elemNext && e.target !== elemPrev) {
          this.boolEndCalendar = false;
      }

      // любой клик обнуляет ошибочный клик
      this.mistakeDateClick = false;

    });


  }

  ngOnInit(): void {
    this.rs.getGuideReservation().subscribe( value => {
      this.roomsArray = value[0];
      console.log('this.roomsArray=', this.roomsArray);
    });

  }


  clickIconBeginCalendar() {
    this.boolBeginCalendar = !this.boolBeginCalendar;
    console.log('this.boolBeginCalendar', this.boolBeginCalendar);
  }

  clickIconEndCalendar() {
    this.boolEndCalendar = !this.boolEndCalendar;
  }


  clickDayBegin(strDate) {

    this.mistakeDateClick = false;

    const dDateBegin = this.toDate(strDate);
    dDateBegin.setHours(0, 0, 0, 0);
    const curDate = new Date();
    curDate.setHours(0, 0, 0, 0);

    if (curDate > dDateBegin) {
      // document.getElementById('textCalenarBegin').textContent = 'Заезд';
      this.mistakeDateClick = true;
      return;
    }

    this.beginCalendar.clear();
    this.sError = '';
    document.getElementById('textCalenarBegin').textContent = strDate;
    this.boolBeginCalendar = false;
    this.boolEndCalendar = true;

  }

  clickDayEnd(strDate) {

    this.mistakeDateClick = false;

    const dDateEnd = this.toDate(strDate);
    dDateEnd.setHours(0, 0, 0, 0);
    const curDate = new Date();
    curDate.setHours(0, 0, 0, 0);

    if (curDate > dDateEnd) {
      // document.getElementById('textCalenarEnd').textContent = 'Выезд';
      this.mistakeDateClick = true;
      return;
    }

    this.endCalendar.clear();
    this.sError = '';
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

    console.log('найти комнаты по условиям');

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

    this.rs.getFindReservation(dDateBegin, dDateEnd, this.numberOfAdults, this.numberOfChildren).subscribe( value => {
      this.roomsArray = value[0];
      // console.log('this.roomsArray=', this.roomsArray);


     // описываем результаты поиска
      const currentDate = new Date();
      const dPipe = new DatePipe('ru');


      // >Результаты: <span> сентябрь 1</span> - <span>октябрь 2, 2020 | 32 ночи(ей)
      this.sddBegin = dPipe.transform(dDateBegin, 'LLLL dd');
      this.sddEnd = dPipe.transform(dDateEnd, 'LLLL dd, yyyy');
      this.daysLag = Math.ceil(Math.abs(dDateEnd.getTime() - dDateBegin.getTime()) / (1000 * 3600 * 24));
      this.bFind = true;
    });
  }

  onClickAboutRoom(idnumber: number, room: any) {
    this.auth.setNumber(idnumber);
    this.auth.setInfoNumber(room);
    this.router.navigate(['/o-komnate/.']);
  }

  toDate(dateStr) {
    const parts = dateStr.split('.');
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }


  isValidDate(d) {
    return d instanceof Date && !isNaN( d.getTime());
  }

  clearfind() {
    console.log('clearfind()');
    if (this.beginCalendar) {
      this.beginCalendar.clear();
      }

    document.getElementById('textCalenarBegin').textContent = 'Заезд';
    this.boolBeginCalendar = false;

    if (this.endCalendar) {
      this.endCalendar.clear();
      }

    this.sddBegin = '';
    this.sddEnd = '';
    this.daysLag = 0;

    this.bFind = false;

    document.getElementById('textCalenarEnd').textContent = 'Выезд';
    this.boolEndCalendar = false;
    this.numberOfChildren = 0;
    this.numberOfAdults = 1;
    this.rs.getGuideReservation().subscribe( value => {
      this.roomsArray = value[0];
    });
  }

  getBeginDate() {
    const strDate = document.getElementById('textCalenarBegin').textContent;
    const dDateBegin = this.toDate(strDate);
    if (isNaN(dDateBegin.getTime())) {
      return new Date();
    }
    if (dDateBegin) {
      dDateBegin.setHours(0, 0, 0, 0);
      return dDateBegin;
    } else {
      return new Date();
    }
  }

}
