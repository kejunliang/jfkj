import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService} from '../../services/authentication.service';
import { first } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FormControl, FormGroup, Validators ,FormBuilder} from '@angular/forms'; 
import { TranslateService } from '@ngx-translate/core';
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
  public authform : FormGroup;
  constructor(public  alertController:AlertController,private auth: AuthenticationService,private router: Router
    ,private storage:Storage,
    private formBuilder: FormBuilder,
    private translate:TranslateService
    ) {
      this.authform = formBuilder.group({
        email: ['', Validators.compose([ Validators.required,])],
        code: ['', Validators.compose([Validators.required,])]
      });
      this.email = this.authform.controls['email']
      this.code = this.authform.controls['code'];

     }

  ngOnInit() {
    this.sendStat=true;
    this.year = new Date().getFullYear().toString();
  }
 
  SendEmail(){
    this.auth.sendEmail(this.authform.value.email,"12345678",this.authform.value.code)
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
            this.translate.get('login').subscribe((res: any) => {
              this.presentAlert(res.authmailerr);
          });
           
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
