import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  client={
    firstName:"",
    lastName:"",
    image:"url",
    statut:"",
	  birthday:"",
  }

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.get("xxxxx").subscribe((res:any)=>{
      this.client.firstName=res.firstName;
      this.client.lastName=res.lastName;
      this.client.statut=res.statut;
      this.client.birthday=res.birthday;
    })
  }

}
