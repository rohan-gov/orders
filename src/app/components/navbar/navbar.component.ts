import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../services/notify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin:any = false;

  constructor(
    private notify: NotifyService,
    private router: Router
  ) { 
    
  }

  ngOnInit() {
    this.loginStatus();
  }

  logout(){
    //this.notify.setNotification();
    this.isLogin = false;
    this.router.navigate(['/sign-in']);
  }

  loginStatus(){
    this.notify.getNotification().subscribe(
      (status)=>{
          this.isLogin = status.Status.loginStatus;
          console.log("status: ", status); 
      }
    );
  }

}
