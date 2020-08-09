import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import seeThru from 'seethru';

@Component({
  selector: 'app-intro-top',
  templateUrl: './intro-top.component.html',
  styleUrls: ['./intro-top.component.css']
})
export class IntroTopComponent implements OnInit, AfterViewInit {

  boolLoader = false;
  @ViewChild('myvideo', { static: false }) videoplayer: ElementRef;
  constructor() { }

  ngOnInit(): void {


  }

  ngAfterViewInit(){
    // this.boolLoader = true;
    const myVideo = document.getElementById('myvideo') as HTMLFormElement;
    // myVideo.muted = false;
    // myVideo.loop = true;

/*
    seeThru
    .create(myVideo, {alphaMask: true})
    // tslint:disable-next-line: only-arrow-functions
    .ready(function(instance, video, canvas) {
        // tslint:disable-next-line: only-arrow-functions
        canvas.addEventListener('click', function() {
          instance.revert();
        });
    });
*/    

  seeThru.create(myVideo, {alphaMask: true});


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

}
