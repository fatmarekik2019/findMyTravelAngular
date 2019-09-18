import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/profile.service';
import * as JWT from "jwt-decode";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  decoded:any;
  userName='';
  display = 'none';
  passChangeButton = false;
  currentPasswordStrength = "";
  confirm=true;
  lastPassword=false;

  client = {
    id: 0,
    firstName: "",
    lastName: "",
    image: "url",
    statut: "",
    birthday: "",
  }
  modifyClientData = new FormGroup({
    id: new FormControl(this.client.id),
    firstName: new FormControl(this.client.firstName, [Validators.minLength(3), Validators.maxLength(10), Validators.pattern('[a-zA-Z ]*'), Validators.required]),
    lastName: new FormControl(this.client.lastName, [Validators.minLength(3), Validators.maxLength(10), Validators.pattern('[a-zA-Z ]*'), Validators.required]),
    statut: new FormControl(this.client.statut, [Validators.minLength(3), Validators.maxLength(30), Validators.required]),
    birthday: new FormControl(this.client.birthday)
  });

  modifyPassData = new FormGroup({
    lastPassword: new FormControl("", Validators.required),
    newPassword: new FormControl("", [Validators.minLength(8), Validators.required]),
    confirmPassword: new FormControl("", Validators.required)
  });

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    let token=localStorage.getItem('token');
    this.decoded=JWT(token);
    this.userName=this.decoded.sub;
    this.profileService.get("xxxxx").subscribe((res: any) => {
      this.client.id = res.id;
      this.client.firstName = res.firstName;
      this.client.lastName = res.lastName;
      this.client.statut = res.statut;
      this.client.birthday = res.birthday;

      this.modifyClientData.setValue({
        id: this.client.id,
        firstName: this.client.firstName,
        lastName: this.client.lastName,
        statut: this.client.statut,
        birthday: this.client.birthday
      });

      console.log(this.modifyClientData.value)
    })
  }
  modifyClient() {
    this.profileService.put(this.modifyClientData.value).subscribe((res: any) => {
      this.client.id = res.id;
      this.client.firstName = res.firstName;
      this.client.lastName = res.lastName;
      this.client.statut = res.statut;
      this.client.birthday = res.birthday;
    });

  }
  modifPass() {
    const data={
      password:this.modifyPassData.value.newPassword
    }
    this.profileService.post(data,this.userName).subscribe(res=>{
      console.log(res);
    });
  }
  checkPassword(){
    if(this.modifyPassData.value.newPassword!==this.modifyPassData.value.confirmPassword){
      this.confirm=false;
    }
    else{
      this.confirm=true;

    }
  }
  checkLastPassword(){
    const data2={
      password:this.modifyPassData.value.lastPassword
    }
    this.profileService.getConfirmPassword(this.userName,data2).subscribe((res:any)=>{
      this.lastPassword=res;
    });
  }
  checkPasswordStrength() {
    let password = this.modifyPassData.value.newPassword;
    // Build up the strenth of our password
    let numberOfElements = 0;
    numberOfElements = /.*[a-z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Lowercase letters
    numberOfElements = /.*[A-Z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Uppercase letters
    numberOfElements = /.*[0-9].*/.test(password) ? ++numberOfElements : numberOfElements;      // Numbers
    numberOfElements = /[^a-zA-Z0-9]/.test(password) ? ++numberOfElements : numberOfElements;   // Special characters (inc. space)

    // Assume we have a poor password already
    this.currentPasswordStrength = "Short";

    // Check then strenth of this password using some simple rules
    if (password === null || password.length < 8) {
      this.currentPasswordStrength = ""
    } else if (numberOfElements === 0 || numberOfElements === 1 || numberOfElements === 2) {
      this.currentPasswordStrength = "Weak password";
    } else if (numberOfElements === 3) {
      this.currentPasswordStrength = "Password Ok";
    } else {
      this.currentPasswordStrength = "Strong password";
    }

    console.log(this.currentPasswordStrength)
  }
}
