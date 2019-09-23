import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService} from '../services/authentication.service'
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string;
  public code: string ;
  public sendStat:Boolean;
  constructor(private auth: AuthenticationService,private router: Router) { }

  ngOnInit() {


    this.sendStat=true;
  }

  //log in system
  Login() {
   
    this.sendStat=false;
    this.auth.login(this.email, this.code)
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['tabs']),
      );
  }
  SendEmail(){
    this.sendStat=false;
    console.log(this.email)
    this.auth.sendEmail(this.email, "12345678")
      .pipe(first())
      .subscribe(
        result => 
        {
          console.log(result)
        }
      );
  }


}
