import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Login } from "../store/auth/auth.action";
import { Router, RouterModule, Routes, RouterOutlet  } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private store: Store,private router: Router,    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required,Validators.email]],
      password: ["", Validators.required]
    });
  }

  login(){
    this.store.dispatch(new Login(this.loginForm.value)).subscribe(
      result => {
        this.router.navigateByUrl("home");
        this.loginForm.enable();
      },
      error => {
        this.loginForm.enable();
        alert("Invalid credentials");
      }
    );
  }
}
