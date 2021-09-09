import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {tryCatch} from "rxjs/internal-compatibility";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentialsForm: FormGroup;
  signupForm: FormGroup;

  constructor(private router: Router,private formBuilder: FormBuilder, private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isAuthenticated){
      this.router.navigate(['/main']);
    }
    this.credentialsForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]]

    });
  }

  onSubmitLogin() {
    this.authService.login(this.credentialsForm.value).subscribe();
  }

  onSubmitSignup() {
    if (this.signupForm.value['password'] == this.signupForm.value['password2'])
      this.authService.register(this.signupForm.value).subscribe();
    else
      this.authService.showAlert('رمز های عبور یکسان نیست.')
  }

  register() {
    const login_form = document.getElementById('login-form');
    const signup_form = document.getElementById('signup-form');
    login_form.hidden = true;
    signup_form.hidden = false;
  }

  login() {
    const login_form = document.getElementById('login-form');
    const signup_form = document.getElementById('signup-form');
    login_form.hidden = false;
    signup_form.hidden = true;
  }

}
