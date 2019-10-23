import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService} from '../../services/authentication.service';
import { first } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GetousService } from "../../services/getous.service";
import { GetpersoninfoService } from "../../services/getpersoninfo.service";
@Component({
  selector: 'app-loginpass',
  templateUrl: './loginpass.page.html',
  styleUrls: ['./loginpass.page.scss'],
})
export class LoginpassPage implements OnInit {
  public user: string ;
  public pass:string;
  constructor(
    public  alertController:AlertController,
    private auth: AuthenticationService,
    private router: Router,
    private storage:Storage,
    private getou:GetousService,
    private getpsn:GetpersoninfoService
    ){
     
    
     }

 

  ngOnInit() {
   this.user=localStorage.getItem('user');
  }

  //log in system
 Login() {
   
  console.log(this.user)
  console.log(this.pass)
  this.auth.login(this.user,this.pass)
    .pipe(first())
    .subscribe(
      result => {
        if(result.returnResponse=="Success"){
          localStorage.setItem('hasLogged','true');
          this.getou.getous(this.user,this.pass).pipe(first()).subscribe(
            data => {
              this.storage.set('ous', JSON.stringify(data));    
            }
          )
          this.getpsn.getpersoninfo(this.user,this.pass).pipe(first()).subscribe(
            data => {
              console.log("人员信息="+JSON.stringify(data))
              this.storage.set('psninfo', JSON.stringify(data));    
            }
          )
          this.router.navigate(['tabs/tab1'])

        }else{
          this.presentAlert("密码错误！");
        }
      },
    );
}

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
