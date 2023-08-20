import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from './custom.validator';
import { DbService } from 'src/app/db.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('formAnimation', [
      state('login', style({ transform: 'rotateY(0deg)' })),
      state('signup', style({ transform: 'rotateY(180deg)' })),
      transition('login <=> signup', animate('0.5s ease-in-out'))
    ])
  ]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  showLoginForm: boolean = true;
  showPassword = false;
  signUpSuccess = false;
  time = 5;
  buttonDisable = false;
  interval: any;

  constructor(
    private formBuilder: FormBuilder, 
    private auth: DbService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      loginUsername: ['', [Validators.required, Validators.email]],
      loginPassword: ['', [Validators.required, passwordValidator()]]
    });

    this.signupForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      signupUsername: ['', [Validators.required, Validators.email]],
      signupPassword: ['', [Validators.required, passwordValidator()]]
    });
  }

  onLoginSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const body = {
        username: this.loginForm.get('loginUsername')?.value.toString().toLowerCase(),
        password: btoa(this.loginForm.get('loginPassword')?.value)
      }
      this.auth.login(body).subscribe({
        next: (res: any) => {
          if (res.data.code === 2000) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            this.sharedService.changeLoginStatus(true);
            this.route.queryParams.subscribe((res: any) => {this.router.navigate([(res?.redirect || '')])}).unsubscribe();
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err.error.err.code === 4000 && err.status === 404) {
            this.loginForm.get('loginUsername')?.setErrors({ customError: true })
          }
          if (err.error.err.code === 4001 && err.status === 401) {
            this.loginForm.get('loginPassword')?.setErrors({ customError: true })
          }
        }
      })
    }
  }

  onSignUpSubmit() {
    this.signupForm.markAllAsTouched();
    if (this.signupForm.valid) {
      const body = {
        firstname: this.signupForm.get('firstname')?.value,
        lastname: this.signupForm.get('lastname')?.value,
        username: this.signupForm.value.signupUsername.toLowerCase(),
        password: btoa(this.signupForm.get('signupPassword')?.value)
      }

      this.auth.signUp(body).subscribe({
        next: (res: any) => {
          this.buttonDisable = true;
          if (res.data.code === 2000) {
            this.signUpSuccess = true;
            this.signupForm.disable();
            this.interval = setInterval(() => {
              this.time -= 1;
              if (this.time === 0) {
                this.buttonDisable = false;
                this.signUpSuccess = false;
                this.showLoginForm = true;
                this.time = 5;
                this.signupForm.reset();
                this.signupForm.enable();
                clearInterval(this.interval);
              }
            }, 1000);
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err.error.err.code === 3001 && err.status === 422) {
            this.signupForm.get('signupUsername')?.setErrors({ customError: true })
          }
        }
      })
    }
  }

  toggleForms(text: string = '') {
    this.showLoginForm = !this.showLoginForm;
    if (text === 'login' && this.buttonDisable) {
      clearInterval(this.interval);
      this.time = 5;
      this.signUpSuccess = false;
      this.signupForm.enable();
      this.buttonDisable = false;
    }
    this.loginForm.reset()
    this.signupForm.reset()
    this.showPassword = false;
  }

  isInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!(control?.invalid && control?.touched);
  }

  isInvalidSignUp(controlName: string): boolean {
    const control = this.signupForm.get(controlName);
    return !!(control?.invalid && control?.touched)
  }
  passwordCriteria(event: any) {
    event.stopPropagation()

  }


}
