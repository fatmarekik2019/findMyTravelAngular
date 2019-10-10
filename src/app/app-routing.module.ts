import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { ResetPasswordComponent} from './reset-password/reset-password.component';
import { LoginComponent} from './login/login.component';
import { ListpublicationComponent } from './dashboard/listpublication/listpublication.component';
import { RegisterComponent } from './register/register.component';
import { CompanyprofileComponent } from './Dashboard/companyprofile/companyprofile.component';
import { RegisterCComponent } from './register-c/register-c.component';
import { AddcursusComponent } from './dashboard/addcursus/addcursus.component';
import { ListCursusComponent } from './Dashboard/list-cursus/list-cursus.component';



const routes: Routes = [
  { path: "", component : LoginComponent},
  {
    path:"Dashboard", 
    component: DashboardComponent, 
    children:[
              {
                path:"",
                component: ProfileComponent
              },
              {
                path:"List",
                component: ListpublicationComponent
              },
              {
                path:"CompanyProfile",
                component: CompanyprofileComponent
              },
              {
                path:"AddCursus",
                component: AddcursusComponent
              },
              {
                path:"ListCursus",
                component : ListCursusComponent
              }
            ]
  },
  { path: "user/confirm-reset/userName/:userName", component : ResetPasswordComponent},
  { path: "RegisterCompany", component : RegisterCComponent},
  { path: "Register", component : RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
