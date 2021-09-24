import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestBase } from 'src/app/services/request-base.services';
import { SessionBase } from 'src/app/services/session.services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  loginObj: any = {};

  constructor(private requestBase: RequestBase, private sessionBase: SessionBase, private router: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    this.loginObj.email = form.value.email
    this.loginObj.password = form.value.password;
    console.log(this.loginObj);
    this.requestBase.getPostData(this.loginObj, true, "auth/login").subscribe(
      data => {
        this.sessionBase.setLocalStorage("cursession", data)
        this.router.navigate(['/']);
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
