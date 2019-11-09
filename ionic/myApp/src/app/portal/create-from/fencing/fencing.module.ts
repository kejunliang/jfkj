import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FencingPage } from './fencing.page';
import { PerimeterComponent } from '../component/perimeter/perimeter.component';
const routes: Routes = [
  {
    path: '',
    component: FencingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FencingPage,PerimeterComponent],
  entryComponents:[PerimeterComponent]
})
export class FencingPageModule {}
