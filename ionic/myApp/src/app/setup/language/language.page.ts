import { Component, OnInit } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {
  public langularArr:any=[
      {lan:'Dutch',shorthand:'dut'},
      {lan:'English',shorthand:'en'},
      {lan:'French',shorthand:'fre'},
      {lan:'German',shorthand:'ger'},
      {lan:'Lceland',shorthand:'lce'},
      {lan:'Norwegian',shorthand:'nor'},
      {lan:'Portuguese',shorthand:'por'},
      {lan:'Spanish',shorthand:'spa'},
    ];
  public language:string='English';
  public name:string;

  constructor() { 
    // this.translate.get('name').subscribe((value)=>{
    //   console.log(value);
    //   this.name=value;
    // })
  }

  ngOnInit() {

  }
  radioCheck(item){
    console.log(this.language)
    console.log(item.shorthand)
    // this.translate.use(item.shorthand)
    // this.translate.get('name').subscribe((value)=>{
    //   console.log(value);
    //   this.name=value;
    // })
    
  }

}
