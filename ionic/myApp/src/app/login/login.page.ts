import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService} from '../services/authentication.service'
import { first } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { ResourceLoader } from '@angular/compiler';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string;
  public code: string ;
  public sendStat:Boolean;

  constructor(public  alertController:AlertController,private auth: AuthenticationService,private router: Router
    ,private storage:Storage) { }

  ngOnInit() {
    this.sendStat=true;
  }
  //log in system
  Login() {
   
    this.sendStat=false;
    this.auth.login(this.code)
      .pipe(first())
      .subscribe(
        result => {
          if(result.status=="sucess"){
            localStorage.setItem('hasLogged','true');
            this.router.navigate(['loginpass'])
          }else{
            this.presentAlert("验证码错误！");
          }
        },
      );
  }
  SendEmail(){
    this.auth.sendEmail(this.email, "12345678",this.code)
      .pipe(first())
      .subscribe(
        result => 
        {
          console.log(result)
          if(result.status!="fail"){
            this.sendStat=false;
           
          }else{
            this.presentAlert("请输入正确的邮箱地址！");
          }
        }
      );
  }
  // 
  async presentAlert(msg:string) {
    const alert = await this.alertController.create({
      header: '提示',
      subHeader: '',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }


}
