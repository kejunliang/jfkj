import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/authemail', pathMatch: 'full' },
  {
    path: 'tabs',
    loadChildren: () => import('./portal/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'account', loadChildren: './setup/account/account.module#AccountPageModule' },
  { path: 'password', loadChildren: './setup/password/password.module#PasswordPageModule' },
  { path: 'offline', loadChildren: './setup/offline/offline.module#OfflinePageModule' },
  { path: 'language', loadChildren: './setup/language/language.module#LanguagePageModule' },
  { path: 'loginpass', loadChildren: './login/loginpass/loginpass.module#LoginpassPageModule' },
  { path: 'authemail', loadChildren: './login/authemail/authemail.module#AuthemailPageModule' },
  { path: 'create-from', loadChildren: './portal/create-from/create-from.module#CreateFromPageModule' },
  { path: 'form-list', loadChildren: './portal/form-list/form-list.module#FormListPageModule' },
  { path: 'fencing', loadChildren: './portal/create-from/fencing/fencing.module#FencingPageModule' },
  { path: 'andit-detail', loadChildren: './portal/create-from/andit-detail/andit-detail.module#AnditDetailPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash:true,preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
