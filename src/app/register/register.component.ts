import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerClient= new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    userName: new FormControl(''),
    birthday: new FormControl('1900-01-01'),
    password: new FormControl('')
  });
  result = true;
  constructor(private registerService: RegisterService) { }

  ngOnInit() {
  }

  register(){

    console.log( this.registerClient.value);
    this.registerService.registerClient(this.registerClient.value).subscribe( (res: any)=>{
      console.log(res);
    });
  }
  
  verifUserName(e){
    this.registerService.verifUserName(e.target.value).subscribe((res: any)=>
    {
      console.log (e.target.value);
      console.log(res);
      this.result = res;
    });
  }

}
