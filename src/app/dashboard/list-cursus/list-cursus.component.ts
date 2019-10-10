import { Component, OnInit } from '@angular/core';
import { CursusService } from 'src/app/cursus.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { ProfileService } from 'src/app/profile.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-list-cursus',
  templateUrl: './list-cursus.component.html',
  styleUrls: ['./list-cursus.component.css']
})
export class ListCursusComponent implements OnInit {

  idUser;

  constructor(
    private router: Router,
    private cursusService: CursusService,
    private loginService: LoginService,
    private profileService: ProfileService
  ) {
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
   }
   listCursus;

  ngOnInit() {
    this.profileService.get(this.loginService.userName).subscribe((res: any) => {
      console.log(res)
      this.idUser = res.id;
      this.cursusService.getAllCursus(this.idUser).subscribe((res:any)=>{
        console.log(res)
        this.listCursus=res;
      })
    });
  }
  showSwal(cursus){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.cursusService.deleteCursus(cursus).subscribe((res: any)=>{
          if(res){

            Swal.fire(
              'Deleted!',
              'Your cursus has been deleted.',
              'success'
            );
            this.router.navigated = false;
            this.router.navigate([this.router.url]);
      
            
          }else{
            Swal.fire(
              'Error!',
              'Error Deleting',
              'error'
            )
          }
        });
      }
      
      
    })
  }

}
