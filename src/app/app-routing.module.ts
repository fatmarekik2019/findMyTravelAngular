import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { ResetPasswordComponent} from './reset-password/reset-password.component';
import { LoginComponent} from './login/login.component';
import { ListpublicationComponent } from './dashboard/listpublication/listpublication.component';
import { RegisterComponent } from './register/register.component';
import { FrontComponent } from './front/front.component';
import { HomeComponent } from './front/home/home.component';
import { PublicationComponent } from './front/publication/publication.component';
import { RegisterCComponent } from './register-c/register-c.component';



const routes: Routes = [
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
              }
            ]
  },
  { path: "user/confirm-reset/userName/:userName", component : ResetPasswordComponent},
  { path: "login", component : LoginComponent},
  { path: "registerClient", component : RegisterComponent},
  { path : "registerCompany", component : RegisterCComponent},
  {path: "", component: FrontComponent,
children:[
  {path: "home", component: HomeComponent},
  {path: "publications", component:PublicationComponent}
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
