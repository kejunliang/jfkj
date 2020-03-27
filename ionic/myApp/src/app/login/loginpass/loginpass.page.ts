import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService} from '../../services/authentication.service';
import { first } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GetousService } from "../../services/getous.service";
import { GetpersoninfoService } from "../../services/getpersoninfo.service";
import { TranslateService } from '@ngx-translate/core';
import { GetallformsService } from "../../services/getallforms.service";

@Component({
  selector: 'app-loginpass',
  templateUrl: './loginpass.page.html',
  styleUrls: ['./loginpass.page.scss'],
})
export class LoginpassPage implements OnInit {
  public user: string ;
  public pass:string;
  public resmsg:string;
  public loginDetails ={
    username:"",
    password:"",
    email:"",
    OUCategory:"",
    server:"",
    folder:""
  }
  public logPic={
    log:"/assets/icon/logo.png",
    background:"/assets/icon/loginpass.png"
  }
  public server:string;
  public folder:string;
  constructor(
    public  alertController:AlertController,
    private auth: AuthenticationService,
    private router: Router,
    private storage:Storage,
    private getou:GetousService,
    private getpsn:GetpersoninfoService,
    private translate:TranslateService,
    private getallforms:GetallformsService
    ){
     
    
     }

 

  ngOnInit() {
   this.user=localStorage.getItem('user');
   this.storage.get("loginDetails").then(data => {
     if(data){
      
       console.log('loginDetails:',data)
       this.loginDetails.email=data.email
       this.loginDetails.OUCategory = data.OUCategory
       this.server = data.server;
       this.folder = data.folder;
      this.pass=data.password;
      this.getou.getLoginPic(data).pipe(first()).subscribe(data => {
       
        this.logPic.log=data.LoginCompanyLogo
        this.logPic.background=data.LoginBKImage
      });
     }else{
      this.loginDetails.email = localStorage.getItem('email')
      this.loginDetails.OUCategory = localStorage.getItem('OUCategory')
      this.server = localStorage.getItem('server');
      this.folder = localStorage.getItem('folder');
     }
    
    })
   
    
   
  }

  //log in system
 Login() {
   
  console.log(this.user)
  console.log(this.pass)
  this.auth.login(this.user,this.pass,this.server,this.folder)
    .pipe(first())
    .subscribe(
      result => {
        if(result.returnResponse=="Success"){
          this.loginDetails.username=this.user.replace(/\\/g, '\\\\').replace(/\'/g, '\\\'');
          this.loginDetails.password=this.pass.replace(/\\/g, '\\\\').replace(/\'/g, '\\\'');
          this.loginDetails.email= this.loginDetails.email;
          this.loginDetails.server = this.server;
          this.loginDetails.folder = this.folder;
          console.log(this.loginDetails)
         // alert(JSON.stringify(this.loginDetails))
          //this.storage.set("loginDetails",this.loginDetails)
          localStorage.setItem('hasLogged','true');
          this.getou.getous(this.user,this.pass,this.server,this.folder).pipe(first()).subscribe(
            data => {
              this.storage.set('ous', JSON.stringify(data));    
            }
          )
          this.getpsn.getpersoninfo(this.user,this.pass,this.server,this.folder).pipe(first()).subscribe(
            data => {
              this.storage.set('psninfo', JSON.stringify(data));    
            }
          )
          this.getallforms.getAllForms(this.loginDetails).pipe(first()).subscribe(data => {
             // console.log("forms信息"+JSON.stringify(data))
              this.storage.set('allforms', JSON.stringify(data));    
          })
          this.router.navigate(['tabs/tab1'])

        }else{
          //this.presentAlert("密码错误！");
          this.translate.get('login').subscribe((res: any) => {
            this.resmsg=res.authpasserr;
         }).add(this.translate.get('alert').subscribe((res: any) => {
             this.presentAlert( this.resmsg,res.title,res.btn);
         }));
        }
      },
    );
}

async presentAlert(msg:string,header:string,btn:string) {

  const alert = await this.alertController.create({
    header: header,
    subHeader: '',
    message: msg,
    buttons: [btn]
  });

  await alert.present();
}

}
