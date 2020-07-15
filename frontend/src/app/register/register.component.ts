import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Login, RegisterUser } from "../store/auth/auth.action";
import { Router, RouterModule, Routes, RouterOutlet  } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private store: Store,private router: Router,    private formBuilder: FormBuilder,
  ) { }
  

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required,Validators.email]],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    });
  }

  register(){
    if(this.loginForm.value.password===this.loginForm.value.confirmPassword){
      this.store.dispatch(new RegisterUser(this.loginForm.value)).subscribe(
        result => {
          this.router.navigateByUrl("");
          this.loginForm.enable();
        },
        error => {
          this.loginForm.enable();
          alert("Cannot register at the moment");
        }
      );
    }
    else{
      alert('Passwords do not match')
    }
  }

}
