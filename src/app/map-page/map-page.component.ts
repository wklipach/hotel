import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { } from 'googlemaps';
import { Router } from '@angular/router';
import { ListGuideService } from '../services/list-guide.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {

  @ViewChild('mapRef', {static: true }) mapElement: ElementRef;
  @ViewChild('pano', {static: true }) mapPano: ElementRef;
  refstyle = '';

  locations = [
    {
      lat: 59.903041,
      lng: 29.076567,
      title: 'Апартаменты Рантала',
      data1: 'Апартаменты Рантала, Парковая, 6',
      data2: 'тел. +79117448813',
    },
    {
      lat: 59.908198,
      lng: 29.065691,
      title: 'Гостиница Виктория',
      data1: 'Гостиница Виктория, Парковая, 72',
      data2: 'тел. +79117448813',
    },
    {
      lat: 59.903220,
      lng: 29.073719,
      title: 'Апартаменты Ленинградская, 70',
      data1: 'Апартаменты Ленинградская, 70',
      data2: 'тел. +79117448813',
    },
    {
      lat: 59.905810,
      lng: 29.080512,
      title: 'Апартаменты пр. Героев, 42',
      data1: 'Апартаменты пр. Героев, 42',
      data2: 'тел. +79117448813',
    },

    {
      lat: 59.905079,
      lng: 29.083898,
      title: 'Апартаменты пр. Героев, 32',
      data1: 'Апартаменты пр. Героев, 32',
      data2: 'тел. +79117448813',
    },

    {
      lat: 59.906779,
      lng: 29.087972,
      title: 'Апартаменты Красных Фортов, 13',
      data1: 'Апартаменты Красных Фортов, 13',
      data2: 'тел. +79117448813',
    },

    {
      lat: 59.909431,
      lng: 29.089051,
      title: 'Апартаменты пр. Героев, 60',
      data1: 'Апартаменты пр. Героев, 60',
      data2: 'тел. +79117448813',
    },

    {
      lat: 59.916620,
      lng: 29.084072,
      title: 'Отель Молодежная, 72',
      data1: 'Отель Молодежная, 72',
      data2: 'тел. +79117448813',
    },
    {
      lat: 59.891769,
      lng: 29.088065,
      title: 'Апартаменты Высотная, 5',
      data1: 'Апартаменты Высотная, 5',
      data2: 'тел. +79117448813',
    },

    {
      lat: 59.887658,
      lng: 29.098988,
      title: 'Отель Мира, 5',
      data1: 'Отель Мира, 5',
      data2: 'тел. +79117448813',
    },

    {
      lat: 59.911222,
      lng: 29.094775,
      title: 'Офис Молодежная, 6а',
      data1: 'Офис Молодежная, 6а',
      data2: 'тел. +79117448813',
    }

  ];


  constructor(private auth: AuthService,
              private router: Router,
              private lsg: ListGuideService) {

  }

  ngOnInit(): void {

    console.log('this.router.url =', this.router.url );
    if (this.router.url === '/o-komnate/.') {

      this.refstyle = 'ref-about-room';

      const room = this.auth.getInfoNumber();
      const idAddress = room.id_address;
      this.lsg.getGuideOneAddress(idAddress).subscribe(listaddress => {
        this.locations = [];

        let latCenter = 59.903043;
        let lngcenter = 29.076565;
        // tslint:disable-next-line: forin
        for (const key in listaddress) {
          if (listaddress.hasOwnProperty(key)) {
            const address = listaddress[key];
            this.locations.push({
              lat: Number(address.lat),
              lng: Number(address.lng),
              title: address.title,
              data1: address.data1,
              data2: address.data2
            });
            latCenter = Number(address.lat);
            lngcenter = Number(address.lng);
          }
          break;
        } // for!
        this.renderMap(latCenter, lngcenter);
      }); // subscribe!

    } else {

      this.refstyle = 'ref-main';

      this.lsg.getGuideAddress(1).subscribe(listaddress => {
      this.locations = [];

      for (const key in listaddress) {
        if (listaddress.hasOwnProperty(key)) {
          const address = listaddress[key];
          this.locations.push({
            lat: Number(address.lat),
            lng: Number(address.lng),
            title: address.title,
            data1: address.data1,
            data2: address.data2
          });
        }
      }
      // center: {lat: 59.903043, lng: 29.076565},
      // AIzaSyA74254mNXG7sVoYX-qpgwWYlXV7jB_IO4
      this.renderMap(59.903043, 29.076565);

      });
    }




  }


  renderMap(latVar, lngVar) {

    // tslint:disable-next-line: no-string-literal
    window['initMap'] = () => {
      this.loadMap(latVar, lngVar);
    };

    if (!window.document.getElementById('google-map-script')) {
      const s = window.document.createElement('script');
      s.id = 'google-map-script';
      s.type = 'text/javascript';
      s.src =  'https://maps.googleapis.com/maps/api/js?key=AIzaSyA74254mNXG7sVoYX-qpgwWYlXV7jB_IO4&callback=initMap';

      window.document.body.appendChild(s);
    } else {
      this.loadMap(latVar, lngVar);
    }
  }

  loadMap = (latVar, lngVar) => {

    // this.mapElement.nativeElement.height = 200;

    const map = new window.google.maps.Map(this.mapElement.nativeElement, {
      center: {lat: latVar, lng: lngVar},
      zoom: 17
    });

/*
    const panorama = this.generatePanorama(59.908198, 29.065691);
    map.setStreetView(panorama);
*/

    // tslint:disable-next-line: forin
    for (const indLoc in this.locations) {
      const location = this.locations[indLoc];
      const marker = new window.google.maps.Marker({
        position: {lat: location.lat, lng: location.lng},
        map,
        title: location.title,
        draggable: true,
        animation: window.google.maps.Animation.DROP,
      });

      const strContentString = this.contentString(indLoc, location.data1, location.data2);

      const infowindow = new window.google.maps.InfoWindow({
        content: strContentString
      });

      marker.addListener('click', () => {
        infowindow.open(map, marker);
        // const p = this.generatePanorama(location.lat, location.lng);
        // map.setStreetView(p);


        });


    }

  }


  contentString(id, data1: string, data2: string) {
  return '<div id="content' + id + '">' +
         '<div id="siteNotice' + id + '"></div>' +
         '<h3 id="thirdHeading' + id + '" class="thirdHeading">' + data1 + '</h3>' +
         '<div id="bodyContent' + id + '">' +
         '<p>"' + data2 + '"</p>' +
         '</div>' +
         '</div>';
  }


  generatePanorama(inLat, inLng) {
    const fenway = { lat: inLat, lng: inLng };
    console.log('this.mapPano.nativeElement=', this.mapPano.nativeElement);
    const panorama = new google.maps.StreetViewPanorama(
      this.mapPano.nativeElement,
      {
        position: fenway,  /*  {lat: inLat, lng: inLng}, */
        pov: {
          heading: 34,
          pitch: 10
        }
      }
    );
    return panorama;
  }


}
