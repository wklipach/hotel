import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {GlobalRef} from '../../services/globalref';
import {Router} from '@angular/router';

@Component({
  selector: 'app-personal-menu',
  templateUrl: './personal-menu.component.html',
  styleUrls: ['./personal-menu.component.css']
})
export class PersonalMenuComponent implements OnInit {

  @Input() numberPage = 0;
  // tslint:disable-next-line: variable-name
  idUser = -1;
  editor = -1;
  public sAvatarPath  = '';
  sUserName = 'Фото';

  constructor(private authService: AuthService, private gr: GlobalRef, private router: Router) { }

  ngOnInit(): void {

    this.idUser = this.authService.getIdUserStorage();

    this.editor = this.authService.getEditorStorage();

    this.onLoadFromBaseAvatar();


  }

  getStyleName(el) {
    // style="font-weight:bold; color: #ff623d;"
    let Res = '';
    if (el.toString() === this.numberPage.toString()) { Res = 'font-weight:bold; color: #FF7F41;'; }
    return Res;
  }

  onLoadFromBaseAvatar() {

    console.log('personal-menu1', 'onLoadFromBaseAvatar');

    this.sAvatarPath = '';
    this.authService.getUserFromId(this.idUser).subscribe((aRes) => {


      if (!aRes) {
        return;
      }


      if (!aRes[0]) {
           return;
      }

      if (aRes[0].name) {
        this.sUserName = aRes[0].name;
      }

      if (aRes[0].surname) {
        this.sUserName = (this.sUserName + ' ' + aRes[0].surname).trim();
      }


      if (!aRes[0].avatar_name) {
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

  logout() {
    this.authService.clearUserStorage();
    this.sAvatarPath  = '';
    this.idUser = -1;
    this.editor = -1;
    this.router.navigate(['/']);
  }


}
