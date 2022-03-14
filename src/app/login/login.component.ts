import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DncService } from '../services/dnc.service';
import { from } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  showMsg: boolean = false;
  submitted = false;
  loginmsg: any;

  loginForm: any = new FormGroup({
    userName: new FormControl(''),
    userPassword: new FormControl('')

  });
  get f() { return this.loginForm.controls; }

  constructor(private dncservices: DncService,
    private router: Router,
    private formBuilder: FormBuilder,) {
  }

  ngOnInit() {
    this.loginValidate();

  }
  loginValidate() {
    this.loginForm = this.formBuilder.group({
      'userName': ['', Validators.required],
      'userPassword': ['', Validators.required],
    });
  }
  onSubmit() {
   // console.log(this.loginForm.value);
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.dncservices.myFunction();
      this.loginmsg = this.dncservices.loginmsg;
      return;
    }
    var url = this.dncservices.LOGIN_DNC_REST_URL;
    console.log("DNC login URL : ", url);
    let body = this.loginForm.value;
    this.dncservices.post(url, body).subscribe(data => {
      var loginResponse: any = data.body;
      console.log("Login respone", loginResponse);
      if (loginResponse["Webservice_Response"] == "true") {

       // console.log("DNC Login Success : ", body);
        this.dncservices.isAuthenticated = true;
        this.router.navigate(['/customdnc']);
      }
      else {
        this.loginmsg = this.dncservices.loginErrormsg;
        this.dncservices.myFunction();
        console.log("DNC Login faild : ", body);
      }
    },
      error => {
        console.log("Login Error : ", error)
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
      });
  }
}
