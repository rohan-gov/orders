import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotifyService } from '../../services/notify.service';
import { Order } from '../../models/order';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  ordersList: Order[];
  userType: String;
  orderStatus: any;
  orders = [
    {
        "orderId": "#AAA",
        "productId": "#p1",
        "productName": "Product1",
        "quantity": 10,
        "customerId": 2
    },
    {
        "orderId": "#BBB",
        "productId": "#p2",
        "productName": "Product1",
        "quantity": 10,
        "customerId": 2
    },
    {
        "orderId": "#CCC",
        "productId": "#p3",
        "productName": "Product5",
        "quantity": 10,
        "customerId": 2
    },
    {
        "orderId": "#DDD",
        "productId": "#p3",
        "productName": "Product3",
        "quantity": 10,
        "customerId": 3
    }
  ];

  singleOrder: any = [{
    orderId:"",
    productId:"",
    quantity: null
  }];


  constructor(
    private authService: AuthService,
    private notify: NotifyService
    ) { }

  ngOnInit() {
    this.getStatus();
  }

  getStatus() {
    this.notify.getNotification().subscribe((data) => {
        console.log("status: ", data);
        this.orderStatus = data;
        this.userType = data.Status.userType;
        this.authService.getOrders(data).subscribe(
          (res) => {
            this.ordersList = res;
            console.log("this.ordersList: ", this.ordersList);
          },
          err => console.log("x err:", err),
          () => console.log("x:complete")
        );  
    });    
  }

  getOrder(id){
    console.log("order id : ", id);
    this.singleOrder = this.orders.filter((order)=> {
      return order.orderId == id;
    });
    console.log("single order: ", this.singleOrder);
  }

}
