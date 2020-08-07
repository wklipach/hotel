import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css']
})
export class TestpageComponent implements OnInit {

  payForm: FormGroup;
  constructor() { 
    this.payForm  = new FormGroup({
    });

  }

  ngOnInit(): void {
  }

  onSubmit() {
    // merchant
    // amount
    // order_id
    // description
    // success_url
    // unix_timestamp
    // signature
  }

}
