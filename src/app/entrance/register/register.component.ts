import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  bPassword = false;
  myForm: FormGroup;

  constructor(private router: Router, private authService: AuthService) {

    this.myForm  = new FormGroup({
      userPhone: new FormControl('', [Validators.required, Validators.minLength(3)], [this.userPhoneAsyncValidator.bind(this)]
      ),

      userEmail: new FormControl('', [
          Validators.required,
          Validators.email
        ], [this.userEmailAsyncValidator.bind(this)]
      ),
      userPassword1: new FormControl('', [Validators.required, Validators.minLength(2)]),
      userPassword2: new FormControl('', [Validators.required, Validators.minLength(2)], [this.password2AsyncValidator.bind(this)])
    });


  }

  ngOnInit(): void {

    this.myForm.controls.userPhone.setValue('');
    this.myForm.controls.userEmail.setValue('');


    console.log('userEmail', this.myForm.controls.userEmail.value);


  }

  // валидатор по имени пользователя
  userPhoneAsyncValidator(control: FormControl): Promise<{[s: string]: boolean}> {
    return new Promise(
      (resolve, reject) => {

        return this.authService.getPhoneUserTable(control.value).subscribe(
          (data: Array<any>) => {
            if (data.length > 0) {
              resolve( {myError: true});
            }   else {
              resolve(null);
            }
          }
        );
      }
    );
  }


  // валидатор по EMail
  userEmailAsyncValidator(control: FormControl): Promise<{[s: string]: boolean}> {
    return new Promise(
      (resolve, reject) => {

        return this.authService.getEmailUserTable(control.value).subscribe(
          (data: Array<any>) => {
            if (data.length > 0) {
              resolve( {errorEmailExists: true});
            } else {
              resolve(null);
            }
          }
        );
      }
    );
  }

  // валидатор по паролю
  password2AsyncValidator(control: FormControl): Promise<{[s: string]: boolean}> {
    return new Promise(
      (resolve, reject) => {
        if (this.myForm.controls.userPassword1.value !== control.value) {
          resolve( {myError: true});
        } else {
          resolve(null);
        }
      }
    );
  }

  submit() {
    this.bPassword = false;

    const {userPhone, userEmail, userPassword1, userPassword2} = this.myForm.value;

    if (userPassword1.trim() !== userPassword2.trim()) {
      this.bPassword = true;
      return -1;
    }

    const NewUser: any = {};
    NewUser.id = -1;
    NewUser.password = CryptoJS.SHA256(userPassword1.trim().toLowerCase()).toString().toLowerCase();
    NewUser.email = userEmail;
    NewUser.surname = '';
    NewUser.name = '';
    NewUser.phone = userPhone;
    NewUser.avatar_name = '';
    NewUser.bitDelete = false;

    const curSubject = 'Добро пожаловать.';
    const curLetter = 'Спасибо за регистрацию. Надеемся, что вы найдете здесь решение ваших вопросов.';

    return this.authService.setNewUser(NewUser, curSubject, curLetter).subscribe((value) => {
          this.authService.setUserId(value[0][0].id_user);
          this.router.navigate(['/']);
        });
  }


  chec() {
    console.log(this.myForm);
  }
}
