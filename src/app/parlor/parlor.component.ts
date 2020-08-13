import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GlobalRef} from '../services/globalref';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-parlor',
  templateUrl: './parlor.component.html',
  styleUrls: ['./parlor.component.css']
})
export class ParlorComponent implements OnInit {

  form: FormGroup;
  parlorForm: FormGroup;
  genderList = [];

  loading = false;
  public sAvatarPath  = '';

  public nick = '';
  public id_user_vict = -1;

  public bPasswordNew = false;
  public bShowChangePassword = false;
  public bErrorRepeatPassword = false;
  public bErrorEmptyPassword = false;


  constructor(private router: Router, private authService: AuthService,
              private fb: FormBuilder, private gr: GlobalRef,
              private cd: ChangeDetectorRef) {
    this.createForm();
  }

  createParlorForm() {
    this.parlorForm = new FormGroup({
      inputUserName: new FormControl({}, []),
      inputName: new FormControl('', []),
      inputLastName: new FormControl('', []),
      inputPatronymic: new FormControl('', []),
      inputZip: new FormControl('', []),
      inputAddress: new FormControl('', []),
      inputPhone: new FormControl('', []),
      inputPhone2: new FormControl('', []),
      inputNewPassword1: new FormControl('', []),
      inputNewPassword2: new FormControl('', [], [this.password2AsyncValidator.bind(this)]),
      inputEmail: new FormControl(null, [
        Validators.required,
        Validators.email
      ], [this.userEmailAsyncValidator.bind(this)]),
      inputGender: new FormControl('', []),
      inputBirth: new FormControl('', [])
    });



    this.genderList = [{id: 1, name: 'Мужской'}, {id: 0, name: 'Женский'}];
    this.parlorForm.controls.inputUserName.disable();
    this.loadUserInfo();
  }

  loadUserInfo() {

    this.authService.getUserFromId(this.id_user_vict).subscribe(value => {


      if (value[0].name) {
        this.parlorForm.controls.inputName.setValue(value[0].name);
      }

      if (value[0].surname) {
        this.parlorForm.controls.inputLastName.setValue(value[0].surname);
      }


      if (value[0].phone) {
        this.parlorForm.controls.inputPhone.setValue(value[0].phone);
      }


      if (value[0].email) {
        this.parlorForm.controls.inputEmail.setValue(value[0].email);
      }


      });
    }

  // parlorForm

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      avatar: ''
    });
  }

  ngOnInit(): void {

      const Res = this.authService.loginUserStorage();
      this.nick = Res.hotelUserName;
      console.log('Res=', Res);
      this.id_user_vict = Number(Res.id_user_hotel);
      this.onLoadFromBaseAvatar();
      this.createParlorForm();

  }


  onFileChange(event) {
    console.log('работаем с картинками');
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {

      const file: File = event.target.files[0];
      // todo 164
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const tempImg = new Image();
        if (typeof reader.result === 'string') {
          tempImg.src = reader.result;
        }

        tempImg.onload = () => {
          const dataURL = this.ResizeImage(tempImg);
          this.form.get('avatar').setValue({
            value: dataURL.split(',')[1]
          });

          this.form.get('name').setValue(file.name);

          this.onPostImageAvatar();
        };
      };
    }
  } // onFileChange(event)

  onPostImageAvatar() {
    console.log('onPostImageAvatar');
    const formModel = this.prepareSave();
    this.loading = true;
    // tslint:disable-next-line:max-line-length
    this.authService.updateAvatarUserTable( {Avatar: formModel.get('avatar'), Name: formModel.get('name') }, this.id_user_vict).subscribe(() => {
      this.loading = false;
      this.onLoadFromBaseAvatar();
    });
  }

  onClearImageAvatar() {
    const formModel = this.prepareSave();
    this.loading = true;
    // tslint:disable-next-line:max-line-length
    this.authService.clearAvatarUserTable(this.id_user_vict).subscribe(() => {
      this.loading = false;
      this.onLoadFromBaseAvatar();
    });
  }

  onLoadFromBaseAvatar() {
    console.log('parlor', 'onLoadFromBaseAvatar');
    this.sAvatarPath = '';
    this.authService.getUserFromId(this.id_user_vict).subscribe((aRes) => {
      console.log('parlor', 'onLoadFromBaseAvatar', 'aRes=', aRes);

      if (!aRes) {
        return;
      }

      if (Array(aRes).length === 0 ) {
        return;
      }

      const S = aRes[0].avatar_name;
      if (S !== '""' && (S)) {
        if (typeof S !== 'undefined') {
          if (S.length > 0) {
            this.sAvatarPath = this.gr.sUrlAvatarGlobal + S;
          }
        }
      }
    });
  }

  private prepareSave(): FormData {
    const input: FormData = new FormData();
    // tslint:disable-next-line:max-line-length
    // This can be done a lot prettier; for example automatically assigning values by looping through `this.form.controls`, but we'll keep it as simple as possible here
    // input.
    input.append('name', this.form.get('name').value);
    input.append('avatar', JSON.stringify(this.form.get('avatar').value));
    return input;
  }

  ResizeImage(tempImg: HTMLImageElement): string {
    const MAX_WIDTH = 200;
    const MAX_HEIGHT = 200;
    let tempW = tempImg.width;
    let tempH = tempImg.height;
    if (tempW > tempH) {
      if (tempW > MAX_WIDTH) {
        tempH *= MAX_WIDTH / tempW;
        tempW = MAX_WIDTH;
      }
    } else {
      if (tempH > MAX_HEIGHT) {
        tempW *= MAX_HEIGHT / tempH;
        tempH = MAX_HEIGHT;
      }
    }
    const canvas = document.createElement('canvas');
    canvas.width = tempW;
    canvas.height = tempH;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(tempImg, 0, 0, tempW, tempH);
    const dataURL = canvas.toDataURL('image/png');

    return dataURL;
  }

  clearFile() {
    this.form.get('avatar').setValue(null);
    this.form.get('name').setValue(null);
    this.sAvatarPath = '';
    this.onClearImageAvatar();
  }


  // валидатор по EMail
  userEmailAsyncValidator(control: FormControl): Promise<{[s: string]: boolean}> {
    return new Promise(
      (resolve, reject) => {

        return this.authService.getCheckEmailWithoutCurrentUser(control.value, this.id_user_vict).subscribe(
          (value: Array<any>) => {
            console.log('userEmailAsyncValidator', value);
            if (value.length > 0) {
              resolve( {errorEmailExists: true});
            }  else {
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
        if (this.parlorForm.controls.inputNewPassword1.value !== control.value) {
          resolve( {myError: true});
        } else {
          resolve(null);
        }
      }
    );
  }

  savecv() {
    if (this.parlorForm.invalid) {
      return -1;
    }

    const {inputName, inputLastName, inputPhone, inputEmail, inputBirth} = this.parlorForm.value;
    const updateuser = 'update_user';
    const date = Date.parse(inputBirth);
    const postUser  = {update_user: updateuser, inputName, inputLastName,
                       inputPhone, inputEmail};

    return this.authService.updateUser(postUser, this.id_user_vict).subscribe(
        () => {
          this.router.navigate(['/']); }
      );

  }

  back() {
    this.router.navigate(['/']);
  }

  NewPassword() {
    this.bErrorRepeatPassword = false;
    this.bErrorEmptyPassword = false;

    const {inputNewPassword1, inputNewPassword2} = this.parlorForm.value;

    if (inputNewPassword1.length === 0 || inputNewPassword2.length === 0) {
      this.bErrorEmptyPassword = true;
      return;
    } else {
      this.bErrorEmptyPassword = false;
    }

    if (inputNewPassword1 === inputNewPassword2) {
      this.bErrorRepeatPassword = false;
    } else {
      this.bErrorRepeatPassword = true;
    }

    if (inputNewPassword1 === inputNewPassword2) {

      return this.authService.updatePassword(CryptoJS.SHA256(inputNewPassword2.trim().toLowerCase()).toString().toLowerCase(),
                                             this.id_user_vict).subscribe(() => {
                                               this.bPasswordNew = true;
                                             });
    }

  }

  DisappearFrame() {
    this.parlorForm.controls.inputNewPassword1.setValue('');
    this.parlorForm.controls.inputNewPassword2.setValue('');
    this.bShowChangePassword = false;

  }

  onClearInputError() {
    this.bErrorEmptyPassword = false;
  }

  accessPassword() {
    this.bShowChangePassword = !this.bShowChangePassword;
    this.cd.detectChanges();  // чтобы разрешить изменения во фрейме, иначе ошибка
  }


}
