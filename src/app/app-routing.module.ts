import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile/profile.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
