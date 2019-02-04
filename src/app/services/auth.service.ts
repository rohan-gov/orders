import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Order } from '../models/order';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  baseUrl: String = "http://localhost:3000/";

  constructor(private httpClient: HttpClient) { }

  singIn(user:any){
    return this.httpClient.get<User[]>(`${this.baseUrl}users?email=${user.email}&password=${user.password}`);
  }

  signUp(user: any){
    console.log("user: ", user);
    let check = this.httpClient.post(`${this.baseUrl}users`, user);
    console.log("check : ", check);
  }

  getOrders(app:any){
    console.log("status:", app.Status);
    let data = app.Status;
    if(data.userType == 'admin'){
      return this.httpClient.get<Order[]>(`${this.baseUrl}orders`);
    }
    else{
      return this.httpClient.get<Order[]>(`${this.baseUrl}orders?customerId=${data.userId}`);
    }

  }

}
