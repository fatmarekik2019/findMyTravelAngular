import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../register.service';
import { PasswordService} from '../password.service';

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
  forgotPassword = new FormGroup({
    
    email: new FormControl("youremail@gmail.com",
       Validators.compose([
         Validators.required,
         Validators.pattern("[A-Za-z0-9.%-]+@[A-Za-z0-9.%-]+\\.[a-z]{2,3}")
    
     ])),
     userName : new FormControl('')
  });
  result : true;
  datas : any;
  constructor(private loginService: LoginService, private registerService: RegisterService, private passwordService: PasswordService) { }

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
      
      this.result = res;
    });
  }

  onClickSend(){
    console.log(this.forgotPassword.value);
    this.passwordService.forgotPassword(this.forgotPassword.value.email, this.forgotPassword.value).subscribe((res : any)=>
    {console.log(res);
  });
}

}
