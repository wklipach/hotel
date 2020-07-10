import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { } from 'googlemaps';


@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {

  @ViewChild('mapRef', {static: true }) mapElement: ElementRef;

  locations = [
    {
      lat: 59.903043,
      lng: 29.076565,
      title: 'Victoria',
      data1: 'Апартаменты Рантала Один',
      data2: 'первый телефон',
    },
    {
      lat: 59.905834,
      lng: 29.080522,
      title: 'Victoria2',
      data1: 'Апартаменты Рантала Два',
      data2: 'второй телефон',
    }
  ];


  constructor() {

  }

  ngOnInit(): void {
    // AIzaSyA74254mNXG7sVoYX-qpgwWYlXV7jB_IO4
    this.renderMap();

  }



  renderMap() {

    window['initMap'] = () => {
      this.loadMap();
    }

    if(!window.document.getElementById('google-map-script')) {
      var s = window.document.createElement('script');
      s.id = 'google-map-script';
      s.type = 'text/javascript';
      s.src =  'https://maps.googleapis.com/maps/api/js?key=AIzaSyA74254mNXG7sVoYX-qpgwWYlXV7jB_IO4&callback=initMap';

      window.document.body.appendChild(s);
    } else {
      this.loadMap();
    }
  }

  loadMap = () => {
    var map = new window['google'].maps.Map(this.mapElement.nativeElement, {
      center: {lat: 59.903043, lng: 29.076565},
      zoom: 17
    });

    // tslint:disable-next-line: forin
    for (const indLoc in this.locations) {
      const location = this.locations[indLoc];
      const marker = new window['google'].maps.Marker({
        position: {lat: location['lat'], lng: location['lng']},
        map: map,
        title: location['title'],
        draggable: true,
        animation: window['google'].maps.Animation.DROP,
      });

      const strContentString = this.contentString(indLoc, location['data1'], location['data2']);

      const infowindow = new window['google'].maps.InfoWindow({
        content: strContentString
      });

        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });


    }


/*
    var marker = new window['google'].maps.Marker(
      {
        position: {lat: 59.903043, lng: 29.076565},
        map: map,
        title: 'Victoria',
        draggable: true,
        animation: window['google'].maps.Animation.DROP,
      }

      ,
      {
        position: {lat: 59.905834, lng: 29.080522},
        map: map,
        title: 'Victoria2',
        draggable: true,
        animation: window['google'].maps.Animation.DROP,
      }
    var contentString = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>'+
    '<h3 id="thirdHeading" class="thirdHeading">Апартаменты Рантала</h3>'+
    '<div id="bodyContent">'+
    '<p>"+79117448813"</p>'+
    '</div>'+
    '</div>';
   
    var infowindow = new window['google'].maps.InfoWindow({
      content: contentString
    });
   
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });

*/      

/*      
      let latLng = {lat: Number(location.latitude), lng: Number(location.longitude)};
      let marker = new google.maps.Marker({
        position: latLng,
        title: location.locationName
    })
      marker.setMap(map)
*/


  }


  contentString(id, data1: string, data2: string) {
  return '<div id="content' + id + '">' +
         '<div id="siteNotice' + id + '"></div>' +
         '<h3 id="thirdHeading' + id + '" class="thirdHeading">' + data1 + '</h3>' +
         '<div id="bodyContent' + id + '">'+
         '<p>"' + data2 + '"</p>' +
         '</div>' +
         '</div>';
  }



}
