import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
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
  userType: any;
  orderStatus: any;
  
  singleOrder: any = [{
    orderId:"",
    productId:"",
    quantity: null
  }];

  OrdersById: any = [{
    orderId:"",
    productId:"",
    quantity: null
  }];

  userStatus: String;


  constructor(
    private authService: AuthService,
    private notify: NotifyService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getStatus();
    this.getOrders();
    this.getOrderById(2);
  }

  getStatus() {
   
      this.orderStatus = this.authService.getStatus();
      
      if(this.orderStatus.userType === ''){
        this.router.navigate(["/sign-in"]);
      }
  }

  getOrders(){
    this.authService.getOrders().subscribe(
      (res) => {
          this.ordersList = res;
          console.log("this.ordersList: ", this.ordersList);
      },
      err => console.log("x err:", err),
      () => console.log("x:complete")
    );  
  }

  getOrderById(id){
    this.authService.getOrdersById(id).subscribe((res) => {
      this.OrdersById = res;
    });
  }

  getOrder(id){
      console.log("id: ", id);
      console.log("this.OrdersById:", this.OrdersById);
      this.singleOrder = this.OrdersById.filter((order)=> {  
        return order.orderId == id;
      });
      console.log("this.singleOrder : ", this.singleOrder);
  }

}
