import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import * as CryptoJS from 'crypto-js';
import {timer} from 'rxjs';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  nStopMs = 1000;
  bConnected = false;
  public showErr = false;
  public showSucc = false;
  public sResTrouble = '';
  public stopCondition = false;
  private subscribeTimer: Subscription;

  public loginForm: FormGroup;
  editor = 0;

  constructor(private router: Router, private authService: AuthService) {

  this.loginForm  = new FormGroup({
      nameOrEmail: new FormControl('',
        [Validators.required, Validators.minLength(3)]),
      password: new FormControl('',
        [Validators.required])
    });



  }


  ngOnInit() {


  }

  ngOnDestroy() {
  if (typeof this.subscribeTimer !== 'undefined') {
    this.subscribeTimer.unsubscribe();
  }
  }


  block_button(ms: number) {
    // блокируем кнопку 1 секунду
    this.stopCondition = true;
    this.subscribeTimer = timer(ms).subscribe(() =>
      this.stopCondition = false);
  }




  submit() {

    // сначала проверяем IP и не даем войти если IP не совпадает



    const sUserOrEmail = this.loginForm.controls.nameOrEmail.value;


    if (this.loginForm.controls.nameOrEmail.value.toString().length < 3)  {
      this.sResTrouble = 'Слишком короткое имя входа.';
      return;
    }

    const sPassword = this.loginForm.controls.password.value;
    const tUser =  {sUserOrEmail: this.loginForm.controls.nameOrEmail.value, sPassword: this.loginForm.controls.password.value};

    this.authService.getUserFromBase(sUserOrEmail).subscribe(
      (value: Array<any>) => {

        if (value[0].length > 1) {
          this.showErr = true;
          this.showSucc = false;
          this.sResTrouble = 'С такими данными больше одного пользователя.';
          this.authService.clearUserStorage();
          this.block_button(this.nStopMs);
        }

        if (!value[0][0].id) {
          this.showErr = true;
          this.showSucc = false;
          this.sResTrouble = 'Пользователь не найден.';
          this.authService.clearUserStorage();
          this.block_button(this.nStopMs);
          return;
        }

        // console.log('value[0]', value[0], value[0][0]['CountBranch']);



        if (value[0].length === 1) {

          this.editor = value[0][0].editor;
          const dbPassword = value[0][0].password;
          console.log('dbPassword =', dbPassword);
          const sFormPassword = CryptoJS.SHA256(this.loginForm.controls.password.value.trim().toLowerCase()).toString().toLowerCase();
          console.log('sFormPassword=', sFormPassword);
          if (dbPassword !== sFormPassword) {
            this.showErr = true;
            this.showSucc = false;
            this.sResTrouble = 'Вы неверно ввели пароль.';
            this.authService.clearUserStorage();
            this.block_button(this.nStopMs);
          }

          if (dbPassword === sFormPassword) {
            const nick = this.getNick(value[0][0].name, value[0][0].surname);
            this.successLogin (nick, value[0][0].id);
            // показываем бранчи и тормозим до выбора

          } // if dbPassword === sFormPassword
        } // value[0].length === 1
    });
  }


  getNick(name, surname) {
    let res = '';
    if (name) {
      res = name;
    }
    if (surname) {
      res = res + ' ' + surname;
    }
    return res.trim();
  }



  // успешный вход
  successLogin (nick, iduser) {
    this.showErr = false;
    this.showSucc = true;
    this.sResTrouble = '';
    this.authService.setUserStorage(nick, iduser, this.editor);
    // переходим на главную страницу
    this.router.navigate(['/']);
  }


}



