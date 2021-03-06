import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { OrderService } from './services/order.service';
import { SuccessfulPaymentComponent } from './successful-payment/successful-payment.component';
import { UnsuccessfulPaymentComponent } from './unsuccessful-payment/unsuccessful-payment.component';
import { TestpageComponent } from './testpage/testpage.component';
import { PamentService } from './services/pament.service';
import {DatePipe, registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { TransferService } from './services/transfer.service';
import { LoginComponent } from './entrance/login/login.component';
import { ForgotPasswordComponent } from './entrance/forgot-password/forgot-password.component';
import { ForgotpasswordService } from './services/forgotpassword.service';
import { RegisterComponent } from './entrance/register/register.component';
import { PersonalMenuComponent } from './header/personal-menu/personal-menu.component';
import { ParlorComponent } from './parlor/parlor.component';
import { ReviewService } from './services/review.service';
import { CashlessComponent } from './cashless/cashless.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { RequisitesComponent } from './requisites/requisites.component';
import {Location} from '@angular/common';
import { EditroomsComponent } from './editrooms/editrooms.component';
import { EditonenumberComponent } from './editonenumber/editonenumber.component';

registerLocaleData(localeRu);

// определение маршрутов
const appRoutes: Routes = [
  {path: '', component: MainComponent},
  {path: 'bronirovanie/.', component: ReservationComponent},
  {path: 'otzyvy/.', component: ReviewsComponent},
  {path: 'transfer/.', component: TransferComponent},
  {path: 'o-nas/.', component: AboutComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'main', component: MainComponent},
  {path: 'o-komnate/.', component: AboutRoomComponent},
  {path: 'administrirovanie/.', component: AddroomsComponent},
  {path: 'zakaz/.', component: OrderComponent},
  {path: 'login/.', component: LoginComponent},
  {path: 'forgot-password/.', component: ForgotPasswordComponent},
  {path: 'register/.', component: RegisterComponent},
  {path: 'kabinet/.', component: ParlorComponent},
  {path: 'itog-oplaty/.', component: CashlessComponent},
  {path: 'spisokzakazov/.', component: OrderlistComponent},
  {path: 'requisites/.', component: RequisitesComponent},
  {path: 'editrooms/.', component: EditroomsComponent},
  {path: 'editonenumber/.', component: EditonenumberComponent}

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
    OrderComponent,
    SuccessfulPaymentComponent,
    UnsuccessfulPaymentComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    PersonalMenuComponent,
    ParlorComponent,
    TestpageComponent,
    CashlessComponent,
    OrderlistComponent,
    RequisitesComponent,
    EditroomsComponent,
    EditonenumberComponent
  ],
  imports: [
    HttpClientModule,
    NgxGalleryModule,
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
              DatePipe, GlobalRef, ListGuideService, NumberService,
              ReservationService, AuthService,  ForgotpasswordService,
              OrderService, PamentService, TransferService, ReviewService],
  bootstrap: [AppComponent]
})
export class AppModule { }

const __stripTrailingSlash = (Location as any).stripTrailingSlash;

Location.stripTrailingSlash = url => {
  if (url.endsWith('/')) {
    url = url;
  }
  else {
    url = url + '/';
  }
  const queryString$ = url.match(/([^?]*)?(.*)/);
  if (queryString$[2].length > 0) {
    return /[^\/]\/$/.test(queryString$[1]) ? queryString$[1] + '.' + queryString$[2] : __stripTrailingSlash(url);
  }
  return /[^\/]\/$/.test(url) ? url + '.' : __stripTrailingSlash(url);
};
