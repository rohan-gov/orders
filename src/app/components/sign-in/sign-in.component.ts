import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { NotifyService } from '../../services/notify.service';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user:any = {
    email : "",
    password: ""
  };
  
  isValid:boolean = true;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private notifyService: NotifyService
  ) { }

  ngOnInit() {
  }

  login(){
    this.authService.singIn(this.user).subscribe(
      (user) => {
        if(user.length){
          console.log("user: ", user);
          let statusData = {
            loginStatus: true,
            userId: user[0].id, 
            userType:user[0].userType
          };
          this.notifyService.setNotification(statusData);
          this.authService.setStatus(statusData);
          this.router.navigate(["/order-list"]);

        }else{
          this.isValid = false;
        }
        

      },
      (err) => {
        console.log("error: ", err);
      },
      () => {
        console.log("complete");
      }
    );

    

  }
}
