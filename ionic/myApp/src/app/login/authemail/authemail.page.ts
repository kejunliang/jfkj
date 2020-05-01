import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService} from '../../services/authentication.service';
import { first } from 'rxjs/operators';
import { AlertController,NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FormControl, FormGroup, Validators ,FormBuilder} from '@angular/forms'; 
import { GetousService } from "../../services/getous.service";
import { GetpersoninfoService } from "../../services/getpersoninfo.service";
import { TranslateService } from '@ngx-translate/core';
import { GetallformsService } from "../../services/getallforms.service";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-authemail',
  templateUrl: './authemail.page.html',
  styleUrls: ['./authemail.page.scss'],
})
export class AuthemailPage implements OnInit {

  public email: any;
  public code: any ;
  public sendStat:Boolean;
  public year:string ;
  public user:string ;
  public pass: string ;
  public authform : FormGroup;
  public resmsg:string;
  public name:any;
  public password:any;
  public sso:any;
  public ssoserver:any;
  public ssoserverlist:any = [];
  public ssofolderlist:any = [];
  public server:string;
  public folder:string;
  public loginDetails ={
      email:"",
      code:"",
      OUCategory:"",
      server:"",
      folder:"",
      username:"",
      password:"",
      empgroup:""
  }
  constructor(public  alertController:AlertController,private auth: AuthenticationService,private router: Router
    ,private storage:Storage,
    private formBuilder: FormBuilder,
    private getou:GetousService,
    private getpsn:GetpersoninfoService,
    private translate:TranslateService,
    private getallforms:GetallformsService,
    public navCtrl:NavController,
    private iab:InAppBrowser
    ) {
      this.authform = formBuilder.group({
        code: ['', Validators.required],
        name: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([ Validators.required])],    
        sso:[false],
        ssoserver:['']
      });
      this.email = this.authform.controls['email']
      this.code = this.authform.controls['code'];
      this.name= this.authform.controls['name'];
      this.password= this.authform.controls['password'];
      this.sso = this.authform.controls['sso'];
      this.ssoserver = this.authform.controls['ssoserver'];
     }

  ngOnInit() {
    this.sendStat=true;
    this.year = new Date().getFullYear().toString();
  }
 
  SendEmail(){
    let sso = this.authform.value.sso;
    if(!sso){
      this.auth.sendEmail(this.authform.value.name,"12345678",this.authform.value.code,this.authform.value.password)
      .pipe(first())
      .subscribe(
        result => 
        {
          console.log('SendEmail--result:',result)
          if(result.status!="fail"){
            this.sendStat=true;
            //this.router.navigate(['loginpass'])
            this.user=this.authform.value.name
            this.pass=this.authform.value.password
            this.code = this.authform.value.code;
            this.server=result.server
            this.folder=result.folder

            this.loginDetails.username = this.user;
            this.loginDetails.password = this.pass;
            this.loginDetails.server = this.server;
            this.loginDetails.folder = this.folder;
            this.loginDetails.code = this.code;

            this.storage.set("loginDetails",this.loginDetails)
           
            this.Login();

            // this.loginDetails.email=""
            // this.loginDetails.code=this.authform.value.code
            // this.loginDetails.OUCategory=result.OUCategory;
            // this.loginDetails.server=result.server;
            // this.loginDetails.folder=result.folder;
            // this.storage.set("loginDetails",this.loginDetails)

            
          }else{
             this.translate.get('login').subscribe((res: any) => {
             this.resmsg=res.authmailerr;
          }).add(this.translate.get('alert').subscribe((res: any) => {
              this.presentAlert( this.resmsg,res.title,res.btn);
          }));
           
          }
        }
      );
    }else{
      this.ssologin();
    }
    
  }

  Login() {
   
    this.auth.login(this.user,this.pass,this.server,this.folder)
      .pipe(first())
      .subscribe(
        result => {
          if(result.returnResponse=="Success"){
            //this.loginDetails.username=this.user.replace(/\\/g, '\\\\').replace(/\'/g, '\\\'');
            //this.loginDetails.password=this.pass.replace(/\\/g, '\\\\').replace(/\'/g, '\\\'');
            this.user = result.user.username;
            this.loginDetails.username = this.user;
            this.loginDetails.password = this.pass;
            this.loginDetails.server = this.server;
            this.loginDetails.folder = this.folder;
            this.loginDetails.code = this.code;
            this.loginDetails.email = result.user.email;
            this.loginDetails.OUCategory = result.user.oucategory;

            this.storage.set("loginDetails",this.loginDetails)
            localStorage.setItem('bgcolor',result.color);
            this.auth.updateUserInfo(this.loginDetails).pipe(first()).subscribe(
              data => {
                this.loginDetails.OUCategory = data.OUCategory;
                const EmpCurrentPortal = data.EmpCurrentPortal;
                this.loginDetails.empgroup = EmpCurrentPortal;
                console.log('updateUserInfo---->this.loginDetails:',this.loginDetails)
                localStorage.setItem('EmpCurrentPortal',EmpCurrentPortal)
                this.storage.set("loginDetails",this.loginDetails)
              }
            )
            
            localStorage.setItem('hasLogged','true');
            localStorage.setItem('user',this.user);
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
                this.storage.set('allforms', JSON.stringify(data));    
            })
            this.router.navigate(['tabs/tab1'])
  
          }else{
            //this.presentAlert("password error！");
            this.translate.get('login').subscribe((res: any) => {
              this.resmsg=res.authpasserr;
           }).add(this.translate.get('alert').subscribe((res: any) => {
               this.presentAlert( this.resmsg,res.title,res.btn);
           }));
          }
        },
      );
  }
  // 
  async presentAlert(msg:string,header:string,btn:string) {

    const alert = await this.alertController.create({
      header: header,
      subHeader: '',
      message: msg,
      buttons: [btn]
    });

    await alert.present();
  }
  onchange(){
  
   
  }
  ssoToggle(){
    let sso = this.authform.value.sso;
    let name = this.authform.value.name==''?' ':this.authform.value.name;
    let password = this.authform.value.password==''?' ':this.authform.value.password;
    console.log('--->sso:',sso)
    console.log('this.authform:',this.authform)
    if(!sso){
      // console.log('this.authform.value.name:',this.authform.value.name)
      // console.log('this.authform.value.password:',this.authform.value.password)
      
      // this.authform.setValue({code:this.authform.value.code,name,password,sso,ssoserver:this.authform.value.ssoserver});
      this.authform = this.formBuilder.group({
        code: [this.authform.value.code, Validators.required],
        name: [this.authform.value.name],
        password: [this.authform.value.password],    
        sso:[!sso],
        ssoserver:[this.authform.value.ssoserver, Validators.required]
      });
      console.log('------->this.authform:',this.authform)
      this.auth.sendEmail(this.authform.value.name,"12345678",this.authform.value.code,this.authform.value.password)
      .pipe(first())
      .subscribe(
        result => 
        {
          console.log('SendEmail--result:',result)
          if(result.status!="fail"){
            
            this.ssoserverlist=result.SSOServer;
            this.ssofolderlist=result.SSOFolder;
            console.log('ssoserverlist:',this.ssoserverlist)
          }else{
             this.translate.get('login').subscribe((res: any) => {
             this.resmsg=res.authmailerr;
          }).add(this.translate.get('alert').subscribe((res: any) => {
              this.presentAlert( this.resmsg,res.title,res.btn);
              this.authform.setValue({code:this.authform.value.code,name:this.authform.value.name,password:this.authform.value.password,sso:false,ssoserver:''});
          }));
           
          }
        }
      );
    }else{
      if(name==' ') name='';
      if(password=='') password='';
      // this.authform.setValue({code:this.authform.value.code,name,password,sso,ssoserver:this.authform.value.ssoserver});
      this.authform = this.formBuilder.group({
        code: [this.authform.value.code, Validators.required],
        name: [this.authform.value.name, Validators.compose([Validators.required])],
        password: [this.authform.value.password, Validators.compose([ Validators.required])],    
        sso:[!sso],
        ssoserver:[this.authform.value.ssoserver]
      });
    }
    this.code = this.authform.controls['code'];
    this.name= this.authform.controls['name'];
    this.password= this.authform.controls['password'];
    this.ssoserver = this.authform.controls['ssoserver'];
    console.log('this.code:',this.code)
  }
  ssologin(){
    console.log('this.authform.value.ssoserver:',this.authform.value.ssoserver)
    const browser = this.iab.create(this.authform.value.ssoserver, '_blank', 'location=yes,toolbar=yes');
  }
}
