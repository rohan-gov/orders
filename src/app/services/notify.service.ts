import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor() { }

  private subject = new Subject<any>();

  setNotification(data:any){
    this.subject.next({Status: data});
  }
  getNotification(): Observable<any>{
    return this.subject.asObservable();
  }
  clearNotification(){
    this.subject.next();
  }
}
