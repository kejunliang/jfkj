import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService} from '../../services/authentication.service';
import { first } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-authemail',
  templateUrl: './authemail.page.html',
  styleUrls: ['./authemail.page.scss'],
})
export class AuthemailPage implements OnInit {

  public email: string;
  public code: string ;
  public sendStat:Boolean;
  public year:string ;
  public user:string ;
  constructor(public  alertController:AlertController,private auth: AuthenticationService,private router: Router
    ,private storage:Storage) { }

  ngOnInit() {
    this.sendStat=true;
    this.year = new Date().getFullYear().toString();
  }
 
  SendEmail(){
    this.auth.sendEmail(this.email,"12345678",this.code)
      .pipe(first())
      .subscribe(
        result => 
        {
          console.log(result)
          if(result.status!="fail"){
            this.sendStat=true;
            localStorage.setItem('user',result.username);
            this.router.navigate(['loginpass'])
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
