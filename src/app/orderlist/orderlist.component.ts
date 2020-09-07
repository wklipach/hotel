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
  sQuestion = '';
  idorder = -1;
  stype = '';

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
      console.log('orderlist=', orderlist);
      this.orderlist = orderlist;
    });
  }

  deleteorder(idorder) {
    this.idorder = idorder;
    this.stype = 'delete';
    this.sQuestion = 'Вы уверены что желаете удалить заказ №' + idorder + '?';
    const modalWindow = document.getElementById('openModalButton');
    modalWindow.click();
  }

  payorder(idorder) {
    this.idorder = idorder;
    this.stype = 'pay';
    this.sQuestion = 'Вы готовы подтвердить платеж по заказу №' + idorder + '?';
    const modalWindow = document.getElementById('openModalButton');
    modalWindow.click();
  }

  onYesClick(idorder, stype) {
    document.getElementById('closeModalButton').click();

    if (stype === 'delete') {
        this.os.setDeleteOrder(idorder).subscribe( () => {
        this.loadOrderList();
      });
    }

    if (stype === 'pay') {
      this.os.setPayOrder(idorder).subscribe( () => {
        this.loadOrderList();
      });
    }

  }


}
