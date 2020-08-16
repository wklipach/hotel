import { Component, OnInit, EventEmitter, Output, Input, IterableDiffers, IterableDiffer, DoCheck } from '@angular/core';


@Component({
  selector: 'app-easycalendar',
  templateUrl: './easycalendar.component.html',
  styleUrls: ['./easycalendar.component.css']
})
export class EasycalendarComponent implements OnInit, DoCheck  {

  @Output() clickDay = new EventEmitter<string>();
  @Output() clickPrev = new EventEmitter<Date>();
  @Output() clickNext = new EventEmitter<Date>();
  @Output() clickNow = new EventEmitter<Date>();
  @Output() easyinit = new EventEmitter<Date>();

  // даты занятые пользователем
  @Input() checkedDate = [];
  private differ: IterableDiffer<[]>;

  weekCount = 0;
  weekFirst = 0;
  curMonth = 0;
  arrarWeekMonth: any;
  curDate: Date;

    // даты занятые другим человеком
  busyDate = [];

  // выбранная дата для начала промежутка
  strDateBegin = '';

  constructor(private iterableDiffers: IterableDiffers) {
    this.differ = iterableDiffers.find([]).create(null);
    this.curDate = new Date();
  }

  ngOnInit(): void {
    this.initMethod (this.curDate);
    this.easyinit.emit(this.curDate);
  }


  ngDoCheck() {
    const changes = this.differ.diff(this.checkedDate);
    if (changes) {
        this.initMethod ( this.curDate );
    }
}

  public initMethod(curDate: Date) {

    const weekCount = this.getWeeks(curDate.getFullYear(), curDate.getMonth());
    const weekFirst = this.getFirstWeeks(curDate.getFullYear(), curDate.getMonth());
    this.arrarWeekMonth = this.getWeekArrayCount(weekCount, weekFirst, curDate.getFullYear(), curDate);
  }

  public getIncDate(value, addDays) {
    return  value.setDate(value.getDate() + addDays);
  }

  getValue(week, y, addDay) {
    const res = new Date(this.getIncDate( this.getDateOfISOWeek(week, y), addDay)).getDate();
    return res;
  }

    // дата начала заданной недели ISO8601 (которая всегда будет понедельником)
    getDateOfISOWeek(w, y) {
      const simple = new Date(y, 0, 1 + (w - 1) * 7);
      const dow = simple.getDay();
      const ISOweekStart = simple;
      if (dow <= 4) {
          ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
      }
      else {
          ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
      }
      return ISOweekStart;
  }

  getTag(week, y, addDay) {
    return this.formatDate(this.getIncDate( this.getDateOfISOWeek(week, y), addDay));
  }

    // массив с номерами недель и первыми числами недели

    public getWeekArrayCount(weekCount, weekFirst, y, curDate) {


      // иногда 1-2-3 число относят к предыдущему году. В этом случае выдают для 1 числа неделю большую чем 1, 
      // то есть последнюю неделю ушедшего года. Напирмер 52, 53 и т.п. 
      // В этом случае дата создаеься корректно из такой недели и предыдущего года

      if (curDate.getMonth() === 0 && weekFirst > 0) {
         y = y - 1;
      }

      const strNowDate = this.formatDate(new Date());

      return Array<any> (weekCount).fill([0, null]).map((x: any, i: any) =>
      [
       {tagMo: this.getTag(i + weekFirst, y, 0),
        dayMo: this.getValue(i + weekFirst, y, 0),
        weekISOnumber: i + weekFirst,
        weekNumber: i,
        boolCurMonth: this.getPeriod(i + weekFirst, y, 0, curDate),
        boolCurDate: this.boolCurDate(strNowDate, this.getTag(i + weekFirst, y, 0)),
        tag: this.getTag(i + weekFirst, y, 0),
        boolCheckDay: this.checkedDate.includes(this.getTag(i + weekFirst, y, 0)),
        boolBusyDay: this.busyDate.includes(this.getTag(i + weekFirst, y, 0))
        },
  
       {tagTu: this.getTag(i + weekFirst, y, 1),
        dayTu: this.getValue(i + weekFirst, y, 1),
        weekISOnumber: i + weekFirst,
        weekNumber: i,
        boolCurMonth: this.getPeriod(i + weekFirst, y, 1, curDate),
        boolCurDate: this.boolCurDate(strNowDate, this.getTag(i + weekFirst, y, 1)),
        tag: this.getTag(i + weekFirst, y, 1),
        boolCheckDay: this.checkedDate.includes(this.getTag(i + weekFirst, y, 1)),
        boolBusyDay: this.busyDate.includes(this.getTag(i + weekFirst, y, 1))
      },
  
       {tagWe: this.getTag(i + weekFirst, y, 2),
        dayWe: this.getValue(i + weekFirst, y, 2),
        weekISOnumber: i + weekFirst,
        weekNumber: i,
        boolCurMonth: this.getPeriod(i + weekFirst, y, 2, curDate),
        boolCurDate: this.boolCurDate(strNowDate, this.getTag(i + weekFirst, y, 2)),
        tag: this.getTag(i + weekFirst, y, 2),
        boolCheckDay: this.checkedDate.includes(this.getTag(i + weekFirst, y, 2)),
        boolBusyDay: this.busyDate.includes(this.getTag(i + weekFirst, y, 2))
      },
  
       {tagTh: this.getTag(i + weekFirst, y, 3),
        dayTh: this.getValue(i + weekFirst, y, 3),
        weekISOnumber: i + weekFirst,
        weekNumber: i,
        boolCurMonth: this.getPeriod(i + weekFirst, y, 3, curDate),
        boolCurDate: this.boolCurDate(strNowDate, this.getTag(i + weekFirst, y, 3)),
        tag: this.getTag(i + weekFirst, y, 3),
        boolCheckDay: this.checkedDate.includes(this.getTag(i + weekFirst, y, 3)),
        boolBusyDay: this.busyDate.includes(this.getTag(i + weekFirst, y, 3))
      },
  
       {tagFr: this.getTag(i + weekFirst, y, 4),
        dayFr: this.getValue(i + weekFirst, y, 4),
        weekISOnumber: i + weekFirst,
        weekNumber: i,
        boolCurMonth: this.getPeriod(i + weekFirst, y, 4, curDate),
        boolCurDate: this.boolCurDate(strNowDate, this.getTag(i + weekFirst, y, 4)),
        tag: this.getTag(i + weekFirst, y, 4),
        boolCheckDay: this.checkedDate.includes(this.getTag(i + weekFirst, y, 4)),
        boolBusyDay: this.busyDate.includes(this.getTag(i + weekFirst, y, 4))
      },

       {tagSa: this.getTag(i + weekFirst, y, 5),
        daySa: this.getValue(i + weekFirst, y, 5),
        weekISOnumber: i + weekFirst,
        weekNumber: i,
        boolCurMonth: this.getPeriod(i + weekFirst, y, 5, curDate),
        boolCurDate: this.boolCurDate(strNowDate, this.getTag(i + weekFirst, y, 5)),
        tag: this.getTag(i + weekFirst, y, 5),
        boolCheckDay: this.checkedDate.includes(this.getTag(i + weekFirst, y, 5)),
        boolBusyDay: this.busyDate.includes(this.getTag(i + weekFirst, y, 5))
      },

       {tagSu: this.getTag(i + weekFirst, y, 6),
        daySu: this.getValue(i + weekFirst, y, 6),
        weekISOnumber: i + weekFirst,
        weekNumber: i,
        boolCurMonth: this.getPeriod(i + weekFirst, y, 6, curDate),
        boolCurDate: this.boolCurDate(strNowDate, this.getTag(i + weekFirst, y, 6)),
        tag: this.getTag(i + weekFirst, y, 6),
        boolCheckDay: this.checkedDate.includes(this.getTag(i + weekFirst, y, 6)),
        boolBusyDay: this.busyDate.includes(this.getTag(i + weekFirst, y, 6))
      }

    ]);
    }

    boolCurDate(strNowDate, strCurDate) {
      if (strNowDate === strCurDate) {
        return true; } else {
          return false; }
    }

      getPeriod(week, y, addDay, curDate) {

        const curD = new Date(curDate);
        const varDay = new Date(this.getIncDate( this.getDateOfISOWeek(week, y), addDay));
        const d = varDay.getMonth();

        if (curD.getFullYear() !== varDay.getFullYear() || curD.getMonth() !== varDay.getMonth()) {
          return false;
        } else {
          return true; }
      }

  getFirstWeeks(year, month) {
    const date = new Date(year, month, 1);
    return this.getWeekNumber(date);
  }

    // получение ISO номера недели по дате
    getWeekNumber(date) {
      // Thursday in current week decides the year.
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      // January 4 is always in week 1.
      const week1 = new Date(date.getFullYear(), 0, 4);
      // Adjust to Thursday in week 1 and count number of weeks from date to week1.
      return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                                      - 3 + (week1.getDay() + 6) % 7) / 7);
    }

  // число недель в месяце вместе с неполными неделями, неделя с понедельника
  getWeeks(year, month) {
    const l = new Date(year, month + 1, 0);
    return Math.ceil( (l.getDate() - (l.getDay() ? l.getDay() : 7)) / 7 ) + 1;
  }

  // дата для идентификации элементов в виде dd.mm.yyyy
formatDate(date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) {
      month = '0' + month.toString();
  }
  if (day.length < 2) {
      day = '0' + day.toString();
  }

  return [day, month, year].join('.');
}

prev() {
  this.curDate.setDate(1);
  this.curDate.setMonth(this.curDate.getMonth() - 1);
  this.initMethod ( this.curDate );
  this.clickPrev.emit(this.curDate);
}

next() {
  this.curDate.setDate(1);
  this.curDate.setMonth(this.curDate.getMonth() + 1);
  this.initMethod ( this.curDate );
  this.clickNext.emit(this.curDate);
}

now() {
  this.curDate = new Date();
  this.initMethod ( this.curDate );
  this.clickNow.emit(this.curDate);
}

/*
busyNotMonthDay
busyMonthNowDay
busyMonthDay
checkedNotMonthDay
uncheckedNotMonthDay
checkedNowMonthDay
uncheckedNowMonthDay
checkedMonthDay
*/

getCurrentStyle(boolCurMonth: boolean, boolNow: boolean, boolCheckDay: boolean, boolBusyDay: boolean) {

  // не входящий в месяц день, который занят другим пользователем
  if (!boolCurMonth && boolBusyDay) {
    return 'busyNotMonthDay';
  }

  // сегодня, который занят другим пользователем
  if (boolCurMonth && boolNow && boolBusyDay) {
    return 'busyMonthNowDay';
  }

  // день текущего месяца, который занят другим пользователем
  if (boolCurMonth && !boolNow && boolBusyDay) {
    return 'busyMonthDay';
  }



 // не входящий в месяц день, который выбрали
  if (!boolCurMonth && boolCheckDay) {
     return 'checkedNotMonthDay';
 }

// не входящий в месяц день, который не выбрали
  if (!boolCurMonth && !boolCheckDay) {
  return 'uncheckedNotMonthDay';
}

 // сегодняшняя дата которую выбрали
  if (boolCurMonth && boolCheckDay && boolNow) {
  return 'checkedNowMonthDay';
}

 // сегодняшняя дата которую не выбрали
  if (boolCurMonth && !boolCheckDay && boolNow) {
  return 'uncheckedNowMonthDay';
}


  // день текущего месяца который выбрали
  if (boolCurMonth && boolCheckDay && !boolNow) {
  return 'checkedMonthDay';
  }

 // обычный день текущего месяца который не выбрали и не занят
  return '';

}

// формирование макссива с датами при клике мыши
flipoverMouseCheckDate(strDate: string, boolCurMonth: boolean) {

  this.clickDay.emit(strDate);


  const nowDate = new Date();
  nowDate.setHours(0, 0, 0, 0);
  if (this.stringToDate(strDate) < nowDate) {
    return;
  }

  setTimeout(() =>   {

    const boolIncludes = this.checkedDate.includes(strDate);

    if (boolIncludes) {
      // удаляем
      const ind =  this.checkedDate.indexOf(strDate);
      if (ind > -1) {
       this.checkedDate.splice(ind, 1);
       // перерисовываем
       this.checkArarWeekMonth(strDate, false);
      }
    }

    if (!boolIncludes && boolCurMonth) {
      // добавляем
      this.checkedDate.push(strDate);
      // перерисовываем
      this.checkArarWeekMonth(strDate, true);

      // если это первая точка ставим ее
      if (this.strDateBegin === '') {
      this.strDateBegin = strDate;
      } else {

      // если новая дата больше старой отмечаем все дни в промежутке
       if (this.stringToDate(strDate) > this.stringToDate(this.strDateBegin)) {
          this.checkDayFromPeriod(this.stringToDate(this.strDateBegin), this.stringToDate(strDate));
          this.strDateBegin = '';
       } else {
        this.strDateBegin = strDate;
       }


      }


      }

  }, 50);

}

// добавляем или удаляем занятый день в основной массив
checkArarWeekMonth(strDay: string, boolDay: boolean) {
  let stopBool = false;
  this.arrarWeekMonth.forEach( (anonymeWeek) => {
    anonymeWeek.forEach( (currentDay) => {
    if (currentDay.tag === strDay) {
      stopBool = true;
      currentDay.boolCheckDay = boolDay;
      return currentDay;
    }
    if (stopBool) {
        return anonymeWeek;
      }

    });
  });
}

// преобразовывает dd.mm.yyyy в дату
stringToDate(st: string) {
  const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
  return new Date(st.replace(pattern, '$3-$2-$1'));
}

checkDayFromPeriod(dateBegin, dateEnd) {
  // делаем цикл по датам
  const D = new Date(dateBegin);

  while (D <= dateEnd) {
    const strNowDate = this.formatDate(D);

    if (!this.checkedDate.includes(strNowDate)) {
      this.checkedDate.push(strNowDate);
    }

    this.checkArarWeekMonth(strNowDate, true);
    D.setDate(D.getDate() + 1);
  }

}

mouseOver(event: { buttons: number; }, strDay: string, boolCurMonth: boolean) {

  if (event.buttons === 1 && boolCurMonth) {
      // добавляем элемент к выделенным
      if (!this.checkedDate.includes(strDay)) {
         this.checkedDate.push(strDay);
         // правим массив на этот день
         this.checkArarWeekMonth(strDay, true);

      }
  }
}

// очищает все выбранные дни
clear() {

  this.strDateBegin = '';
  this.checkedDate = [];

  this.arrarWeekMonth.forEach( (anonymeWeek) => {
    anonymeWeek.forEach( (currentDay) => {
      currentDay.boolCheckDay = false;
    });
  });

}

}
