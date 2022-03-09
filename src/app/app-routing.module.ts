import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dnclogin',
    pathMatch: 'full'
  },
  { path: 'dnclogin', component: LoginComponent },
  { path: 'customdnc', component: LayoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
      {useHash: true}
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
