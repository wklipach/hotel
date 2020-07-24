import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as $ from 'jquery';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { ReservationComponent } from './reservation/reservation.component';
import { TransferComponent } from './transfer/transfer.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ContactsComponent } from './contacts/contacts.component';
import { IntroComponent } from './intro/intro.component';
import { GalleryPageComponent } from './gallery-page/gallery-page.component';
import { MapPageComponent } from './map-page/map-page.component';
import { EasycalendarComponent } from './components/easycalendar/easycalendar.component';
import { WeekdaysComponent } from './components/weekdays/weekdays.component';
import { FooterComponent } from './footer/footer.component';
import { AddroomsComponent } from './addrooms/addrooms.component';
import { MainComponent } from './main/main.component';
import { IntroTopComponent } from './intro-top/intro-top.component';
import { AboutRoomComponent } from './about-room/about-room.component';

import { HttpClientModule} from '@angular/common/http';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { ListGuideService } from './services/list-guide.service';
import { GlobalRef } from './services/globalref';
import { ReactiveFormsModule } from '@angular/forms';
import { NumberService } from './services/number.service';
import { ReservationService } from './services/reservation.service';
import { AuthService } from './services/auth.service';
import { OrderComponent } from './order/order.component';

// определение маршрутов
const appRoutes: Routes = [
  {path: '', component: MainComponent},
  {path: 'reservation', component: ReservationComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'reviews', component: ReviewsComponent},
  {path: 'transfer', component: TransferComponent},
  {path: 'about', component: AboutComponent },
  {path: 'header', component: HeaderComponent},
  {path: 'main', component: MainComponent},
  {path: 'about-room', component: AboutRoomComponent},
  {path: 'admin', component: AddroomsComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    ReservationComponent,
    TransferComponent,
    ReviewsComponent,
    ContactsComponent,
    IntroComponent,
    GalleryPageComponent,
    MapPageComponent,
    EasycalendarComponent,
    WeekdaysComponent,
    FooterComponent,
    AddroomsComponent,
    MainComponent,
    IntroTopComponent,
    AboutRoomComponent,
    OrderComponent
  ],
  imports: [
    HttpClientModule,
    NgxGalleryModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)


  ],
  providers: [GlobalRef, ListGuideService, NumberService, ReservationService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
