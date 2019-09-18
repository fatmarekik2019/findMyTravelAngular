import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { ResetPasswordComponent} from './reset-password/reset-password.component';
import { LoginComponent} from './login/login.component';



const routes: Routes = [
  {
    path:"Dashboard", 
    component: DashboardComponent, 
    children:[
              {
                path:"",
                component: ProfileComponent
              }
            ]
  },
  { path: "user/confirm-reset/userName/:userName", component : ResetPasswordComponent},
  { path: "", component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
