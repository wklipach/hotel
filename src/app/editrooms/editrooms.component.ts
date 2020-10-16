import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {NumberService} from "../services/number.service";

@Component({
  selector: 'app-editrooms',
  templateUrl: './editrooms.component.html',
  styleUrls: ['./editrooms.component.css']
})
export class EditroomsComponent implements OnInit {

  numberList = [];
  sQuestion = '';
  stype = '';
  idnumber = -1;

  constructor(private ns: NumberService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {

    const editor = this.authService.getEditorStorage();
    if (editor !== 1) {
      this.router.navigate(['/']);
    }
    this.loadNumberList();
  }


  loadNumberList() {
    this.ns.getListNumber(-1).subscribe( (numberlist: Array<any>) => {
      console.log('numberlist=', numberlist);
      this.numberList = numberlist;
    });

  }

  editCurrentNumber(id) {
    this.authService.setEditNumber(id);
    this.router.navigate(['/editonenumber/.']);
  }

  deleteCurrentNumber(id, descr) {
    this.idnumber = id;
    this.stype = 'delete';
    this.sQuestion = 'Вы хотите удалить номер "'+descr+'"?';
    const modalWindow = document.getElementById('openNumberModalButton');
    modalWindow.click();
  }

  onYesClick(idnumber, stype) {
    document.getElementById('closeNumberModalButton').click();
    if (stype === 'delete') {
            this.ns.setDeleteNumber(idnumber).subscribe(() => {
             this.loadNumberList();
      });
    }

  }
}
