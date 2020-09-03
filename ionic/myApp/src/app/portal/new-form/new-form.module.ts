import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewFormPage } from './new-form.page';
import { PopoverComponent } from "../../common/popover/popover.component";
import { SecurityComponent} from "../../common/security/security.component"
import {OpenModalComponent} from "../../common/open-modal/open-modal.component";
import { RiskmatrixComponent } from "../../common/riskmatrix/riskmatrix.component";
//import { SignaturepadPopover } from '../signaturepad-popover/signaturepad-popover';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SignaturepadPopover } from '../signaturepad-popover/signaturepad-popover';
import { MicrodbComponent } from '../microdb/microdb.component';
import { DynamicsecComponent } from '../dynamicsec/dynamicsec.component'

const routes: Routes = [
  {
    path: '',
    component: NewFormPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignaturePadModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewFormPage,PopoverComponent,SecurityComponent,OpenModalComponent,RiskmatrixComponent,SignaturepadPopover,MicrodbComponent,DynamicsecComponent],
  entryComponents:[PopoverComponent,SecurityComponent,OpenModalComponent,RiskmatrixComponent,SignaturepadPopover,MicrodbComponent]
})
export class NewFormPageModule {}
