import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-editonenumber',
  templateUrl: './editonenumber.component.html',
  styleUrls: ['./editonenumber.component.css']
})
export class EditonenumberComponent implements OnInit {

  id_number = -1;
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    const editor = this.auth.getEditorStorage();
    if (editor !== 1) {
      this.router.navigate(['/']);
    }

    this.id_number = this.auth.getEditNumber();
    if (this.id_number === -1) {
      this.router.navigate(['/']);
    }

    console.log('id_number', this.id_number);

  }

}
