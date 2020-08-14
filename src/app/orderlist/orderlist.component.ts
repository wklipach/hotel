import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {

  orderlist = [];

  constructor(private authService: AuthService, private os: OrderService, private router: Router) { }

  ngOnInit(): void {

    const editor = this.authService.getEditorStorage();
    if (editor !== 1) {
      this.router.navigate(['/']);
    }

    this.loadOrderList();
  }

  loadOrderList() {
    this.os.getOrderList().subscribe ( (orderlist: Array<any>) => {
      this.orderlist = orderlist;
    });
  }

  deleteorder(idorder) {
    if (confirm('Вы уверены что желаете удалить заказ №' + idorder + '?')) {
      this.os.setDeleteOrder(idorder).subscribe( () => {
        this.loadOrderList();
      });
    }
  }

  payorder(idorder) {
    if (confirm('Вы готовы подтвердить платеж по заказу №' + idorder + '?')) {
      this.os.setPayOrder(idorder).subscribe( () => {
        this.loadOrderList();
      });
    }
  }


}
