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
  status : any = {
    loginStatus: false,
    userId: null, 
    userType:''
  };
  constructor(private httpClient: HttpClient) { }

  singIn(user:any){
    return this.httpClient.get<User[]>(`${this.baseUrl}users?email=${user.email}&password=${user.password}`);
  }

  signUp(user: any){
    console.log("user: ", user);
    let check = this.httpClient.post(`${this.baseUrl}users`, user);
    console.log("check : ", check);
  }

  getOrders(){
      return this.httpClient.get<Order[]>(`${this.baseUrl}orders`);
  }

  getOrdersById(id: any){
      return this.httpClient.get<Order[]>(`${this.baseUrl}orders?customerId=${id}`);
  }

  setStatus(data:any){
    this.status = data;
  }

  getStatus(){
    return this.status;
  }

}
