import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateFromPage } from './create-from.page';
import { AuditDetailModalComponent } from './component/audit-detail-modal/audit-detail-modal.component';
import { SecurityComponent } from './component/security/security.component';

const routes: Routes = [
  {
    path: '',
    component: CreateFromPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateFromPage,AuditDetailModalComponent,SecurityComponent],
  entryComponents:[AuditDetailModalComponent,SecurityComponent]
})
export class CreateFromPageModule {}
