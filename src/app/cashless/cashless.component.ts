import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-cashless',
  templateUrl: './cashless.component.html',
  styleUrls: ['./cashless.component.css']
})
export class CashlessComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  id_order = -1;

  datebegin: Date = null;
  dateend: Date = null;
  totalrub = 0;
  deposit = 0;
  description = '';
  sCashless = 'да';
  name = '';
  addorder = [];



  constructor(private route: ActivatedRoute, private os: OrderService, private router: Router) {
        this.route.queryParams.subscribe(params => {
            this.id_order = params.id_order;
        });

  }

  ngOnInit(): void {
    this.os.getOrder(this.id_order).subscribe ( valorder => {
      this.datebegin = valorder[0].date_begin;
      this.dateend = valorder[0].date_end;
      this.totalrub = valorder[0].total_rub;
      this.deposit = valorder[0].deposit;
      this.description = valorder[0].description;

      if (Boolean(valorder[0].bitCashless) === false) {
        this.sCashless = 'нет';
      }
      this.name = valorder[0].name;
    });

    this.os.getAdditionalOrder(this.id_order).subscribe ( (addorder: Array<any>) => {
      this.addorder = addorder;
    });


  }

  clickApply() {
    this.router.navigate(['/']);
  }



}
