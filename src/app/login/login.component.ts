import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login= new FormGroup({
    
    userName: new FormControl(''),
    password: new FormControl('')
  });
  result : true;
  constructor(private loginService: LoginService, private registerService: RegisterService) { }

  ngOnInit() {
  }

  onClickLogin(){
console.log(this.login.value);
    this.loginService.login(this.login.value).subscribe( (res: any)=>{
      console.log(res);
      localStorage.setItem('token', res.token)
    });
  }

  verifUserName(e){
    this.registerService.verifUserName(e.target.value).subscribe((res: any)=>
    {
      //console.log(res);
      this.result = res;
    });
  }

}
