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
import { AccountService } from "../../services/setup/account.service";
import { LanguageService } from "../../services/setup/language.service";

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
    public account:AccountService,
    public LanguageService:LanguageService,
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
            this.auth.getOfflineMultiData().pipe(first()).subscribe(
              data => {
                console.log('getOfflineMultiData----data...:', data)
                this.storage.set('offlinemuitldata', JSON.stringify(data));
              })
            this.account.getAccount(this.user,this.pass,result.user.email,this.server,this.folder).pipe(first()).subscribe(
                data => {
                  console.log('getAccount:',data)
                  this.storage.set('myaccount', JSON.stringify(data));
                }
              )
              this.LanguageService.getAppTranslation(this.user,this.pass,this.server,this.folder).pipe(first()).subscribe(
                data => {
                  console.log('getAppTranslation:',data)
                  this.storage.set('apptranslation', JSON.stringify(data));
                }
              )
              this.storage.get("allforms").then( forms => {
                if(forms == null){
                  this.downloadAllForms();
                }else{
                  
                  forms = JSON.parse(forms);
                  console.log('forms:',forms);
                  const templates = forms.templates;
                  // const templateids = templates.filter(t => t.lastmodify);
                  const arr = [];
                  templates.forEach(t => {
                    if(t){
                      const lastmodify = t.lastmodify;
                      if(lastmodify){
                        arr.push({
                          tid:t.template.templateId,
                          lastmodify
                        })
                      }
                    }
                    
                  });
                  console.log('--------------arr....',arr);
                  if(arr.length==0){
                    this.downloadAllForms();
                  }else{
                    this.getUpdateFormids(arr).then( data =>{
                      console.log('getUpdateFormids---------------data:',data);
                      if(data.tmplateids){
                        const arr = data.tmplateids;
                        if(arr.length==0){
                          console.log('do not need update allforms');
                          this.router.navigate(['tabs/tab1'])
                        }else{
                          const tarr = [];
                          for (let index = 0; index < arr.length; index++) {
                            const element = arr[index];
                            tarr.push(this.getForm(element));
                          }
                          Promise.all(tarr).then(result => {
                            console.log('----**----===----result:', result);
                            let newtemplates: any = templates;
                            arr.forEach( f => {
                              newtemplates = newtemplates.filter( form => form.template.templateId != f)
                            });
                            newtemplates = newtemplates.concat(result);
                            this.storage.set('allforms', JSON.stringify({ templates: newtemplates }));
                            this.router.navigate(['tabs/tab1'])
                          }).catch(e => {
                            console.log('getform all error:', e);
                          })
                        }
                      }else{
                        if(data.status != 'failed'){
                          console.log('----------------------allforms:',data);
                          this.storage.set('allforms', JSON.stringify(data)); 
                          this.router.navigate(['tabs/tab1'])
                        }
                        
                      }
                    });
                  }
                }
              })
            // this.getallforms.getAllForms(this.loginDetails).pipe(first()).subscribe(data => {
            //     this.storage.set('allforms', JSON.stringify(data));    
            // });
            
            
  
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
  getForm(tmpid: string){
    return new Promise((resolve,reject)=>{
      this.getallforms.getSpecifyForm(this.loginDetails,tmpid).pipe(first()).subscribe(data => {
        console.log('getForm data:',data);
        this.storage.set('tmpid',data)
        resolve(data);
       });
    })
  }
  getFormids():any{
    return new Promise((resolve,reject)=>{
      this.getallforms.getFormids(this.loginDetails).pipe(first()).subscribe(data => {
        console.log('getFormids data:',data);
        //this.storage.set('tmpid',data)
        
        resolve(data);
       });
    })
  }
  downloadAllForms(){
    this.getFormids().then( data =>{
      if(data.tmplateids){
        const arr = data.tmplateids;
        const tarr = [];
        for (let index = 0; index < arr.length; index++) {
          const element = arr[index];
          tarr.push(this.getForm(element));
        }
        Promise.all(tarr).then(result => {
          console.log('------------result:', result)
          this.storage.set('allforms', JSON.stringify({templates:result})); 
          this.router.navigate(['tabs/tab1'])
        }).catch(e => {
          console.log('getform all error:', e);
        })
      }else{
        if(data.status != 'failed'){
          console.log('----------------------allforms:',data);
          this.storage.set('allforms', JSON.stringify(data)); 
          this.router.navigate(['tabs/tab1'])
        }
        
      }
    });
  }
  getUpdateFormids(param: any):any{
    return new Promise((resolve,reject)=>{
      this.getallforms.getUpdateFormids(this.loginDetails,param).pipe(first()).subscribe(data => {
        console.log('getUpdateFormids data:',data);
        //this.storage.set('tmpid',data)
        
        resolve(data);
       });
    })
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
