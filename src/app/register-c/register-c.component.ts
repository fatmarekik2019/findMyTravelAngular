import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisterCompanyService } from '../register-company.service';

@Component({
  selector: 'app-register-c',
  templateUrl: './register-c.component.html',
  styleUrls: ['./register-c.component.css']
})
export class RegisterCComponent implements OnInit {

  registerCompanyData= new FormGroup({
      companyName: new FormControl(''),
	    address: new FormControl(''),
	    city: new FormControl(''),
	    cP: new FormControl(''),
      tel: new FormControl(''),
      password: new FormControl(''),
      userName: new FormControl('')
  });

  constructor(private registerCompanyService: RegisterCompanyService) { }

  ngOnInit() {
  }

  registerCompany(){
    // console.log(this.registerCompanyData.value)
    this.registerCompanyService.post(this.registerCompanyData.value).subscribe(res=>{
      console.log(res);
    });
  }

}
