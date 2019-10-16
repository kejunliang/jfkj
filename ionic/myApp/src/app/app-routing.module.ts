import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
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

  


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash:true,preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
