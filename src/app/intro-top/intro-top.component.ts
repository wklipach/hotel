import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import seeThru from 'seethru';
import {TransferService} from '../services/transfer.service';

@Component({
  selector: 'app-intro-top',
  templateUrl: './intro-top.component.html',
  styleUrls: ['./intro-top.component.css']
})
export class IntroTopComponent implements OnInit, AfterViewInit {

  boolLoader = false;
  @ViewChild('myvideo', { static: false }) videoplayer: ElementRef;
  sErrorPhone = '';


  constructor(private ts: TransferService) { }

  ngOnInit(): void {


  }

  ngAfterViewInit(){
    // this.boolLoader = true;
    const myVideo = document.getElementById('myvideo') as HTMLFormElement;
    // myVideo.muted = false;
    // myVideo.loop = true;

/*
    seeThru
    .create(myVideo, {width: 400, height: 300, alphaMask: true})
    // tslint:disable-next-line: only-arrow-functions
    .ready(function(instance, video, canvas) {
        // tslint:disable-next-line: only-arrow-functions
        canvas.addEventListener('click', function() {
          instance.revert();
        });
    });
*/

   // seeThru.create(myVideo, {width: 400, height: 300, alphaMask: false});


/*
    const promise = this.videoplayer.nativeElement.play();
    if (promise !== undefined) {
        promise.then(() => {
            // Autoplay started!
        }).catch( error => {
            // Autoplay was prevented. Show a "Play" button so that user can start playback.
        });
     }
*/


}

  reservClick() {
    (document.getElementById('inputPhoneNameReserv') as HTMLInputElement).value = '';
    (document.getElementById('inputPhoneNumberReserv') as HTMLInputElement).value = '';
    (document.getElementById('inputPhoneAddReserv') as HTMLTextAreaElement).value = '';
    const modalWindow = document.getElementById('openModalButtonReserv');
    modalWindow.click();
  }

  onYesCallClick() {
    this.sErrorPhone = '';
    const sName = (document.getElementById('inputPhoneNameReserv') as HTMLInputElement).value.trim();
    const sPhone = (document.getElementById('inputPhoneNumberReserv') as HTMLInputElement).value.trim();
    let sAddRef = (document.getElementById('inputPhoneAddReserv') as HTMLTextAreaElement).value;

    if (!sName) {
      this.sErrorPhone = 'введите имя';
      return;
    }

    if (!sPhone) {
      this.sErrorPhone = 'введите номер телефона';
      return;
    }

    if (!sAddRef) {
      sAddRef = '';
    }

    console.log(sName, sPhone, sAddRef);
    document.getElementById('closeModalButtonReserv').click();


    const odata = {
      Заказ: 'Данный клиент просит о бронировании',
      Имя: sName,
      Телефон: sPhone,
      Дополнительно: sAddRef,
      subject: 'Заказан звонок на бронирование от ' + sPhone
    };
    console.log('odata', odata);
    this.ts.sendEmail(odata).subscribe( value => {
      // this.sResultEmail = value.toString();
    });
  }

}
