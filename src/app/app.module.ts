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

// определение маршрутов
const appRoutes: Routes = [
  {path: 'reservation', component: ReservationComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'reviews', component: ReviewsComponent},
  {path: 'transfer', component: TransferComponent},
  {path: 'about', component: AboutComponent },
  {path: 'header', component: HeaderComponent}
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
    WeekdaysComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
