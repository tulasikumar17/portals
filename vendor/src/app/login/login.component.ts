import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Data1Service } from '../data1.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //user="1";
  //pass="123";
  loginForm: FormGroup;
  constructor(
    private router: Router, private http: HttpClient, private s_data: Data1Service){
  }
  venlogin: any;
  user1: any;
  pass1:any;

  ngOnInit(): void {
    
    this.loginForm = new FormGroup(
      {
        user : new FormControl('',[Validators.required]),
        pass : new FormControl('',[Validators.required,Validators.minLength(3)])
      }
    );
  }
  hide = true;
  //onLogin(pageName:string):void {
    onLogin() {
      this.user1=this.loginForm.get('user')?.value;
      this.pass1=this.loginForm.get('pass')?.value;
      this.s_data.use = this.user1;
      console.log(this.user1,this.pass1)
      this.http.post("http://localhost:3030/venlogin", {
      id: this.user1,
      pwd: this.pass1
      }).subscribe(resp=>{ 
      console.log(resp);
      this.venlogin = resp;
      if(this.venlogin == 'L'){
        this.router.navigate(['/home']);
      }else{
        alert("Incorrect credentials");
      }
    })
  }

}
