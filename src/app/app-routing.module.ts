import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { ResetPasswordComponent} from './reset-password/reset-password.component';
import { LoginComponent} from './login/login.component';
import { ListpublicationComponent } from './dashboard/listpublication/listpublication.component';
import { RegisterComponent } from './register/register.component';
import { CompanyprofileComponent } from './Dashboard/companyprofile/companyprofile.component';
import { AddcursusComponent } from './dashboard/addcursus/addcursus.component';
import { ListCursusComponent } from './Dashboard/list-cursus/list-cursus.component';
import { FrontComponent } from './front/front.component';
import { HomeComponent } from './front/home/home.component';
import { PublicationComponent } from './front/publication/publication.component';
import { RegisterCComponent } from './register-c/register-c.component';
import { AdminstatistiqueComponent } from './dashboard/adminstatistique/adminstatistique.component';
import { AdminlistclientComponent } from './dashboard/adminlistclient/adminlistclient.component';
import { AdminlistcompanyComponent } from './dashboard/adminlistcompany/adminlistcompany.component';
import { AdminlistpublicationComponent } from './dashboard/adminlistpublication/adminlistpublication.component';
import { AdminlistcursusComponent } from './dashboard/adminlistcursus/adminlistcursus.component';



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
              },
              {
                path:"Statistique",
                component : AdminstatistiqueComponent
              },
              {
                path:"AdminListClient",
                component : AdminlistclientComponent
              },
              {
                path:"AdminListCompany",
                component : AdminlistcompanyComponent
              },
              {
                path:"AdminListPublication",
                component : AdminlistpublicationComponent
              }, 
              {
                path:"AdminListCursus",
                component : AdminlistcursusComponent
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
