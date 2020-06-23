import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignaturepadPopover } from './signaturepad-popover';

const routes: Routes = [
  {
    path: '',
    component: SignaturepadPopover
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SignaturepadPopover,
  ],
  exports: [
    SignaturepadPopover
  ]
})
export class SignaturepadPopoverModule {}
