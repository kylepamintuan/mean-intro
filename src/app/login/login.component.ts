import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { RequestToBackendService } from '../request-to-backend.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public state = {
    busy: false,
    valid: false
  };
  public loginForm: FormGroup;
  public usernameField: AbstractControl;
  public passwordField: AbstractControl;

  constructor(
    private fb: FormBuilder,
    private reqService: RequestToBackendService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['kyle_p', Validators.required],
      password: ['', Validators.required],
      providers: [RequestToBackendService]
    });
    this.usernameField = this.loginForm.controls.username;
    this.passwordField = this.loginForm.controls.password;

    this.reqService
    .sendRequest('GET', 'http://localhost:3000/api/reauthorize', true, "application/json")
    .subscribe({
      next: (response) => {
        console.log(response);

        if(response.hasOwnProperty('body')) {
          if(response.body.authorized) {
            console.log('User reauthorized via web token');
            this.router.navigate(['dashboard', response.body.username]);
          }
          else {
            console.log('token invalid');
            this.router.navigate(['login']);
          }
        }
      }, 
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSubmit(): void {
    let { username, password } = this.loginForm.value;
    let userPass = `${username}:${password}`;
    
    this.state.busy = true;
    
    this.reqService
    .sendRequest('GET', 'http://localhost:3000/api/login', userPass, 'application/json')
    .subscribe({ 
      next: (response) => {
        console.log(response);

        if(response.hasOwnProperty('body')) {
          response = JSON.stringify(response.body);
          let resObj = JSON.parse(response);

          if(resObj.token) {
            localStorage.setItem('token', resObj.token);

            window.setTimeout(() => {
              this.state.busy = false;
              this.router.navigate(['dashboard', username]);
            }, 2000);
          }
          else {
            this.state.busy = false;
            // TODO: Client-side login error message
          }
        }
      },
      error: (err) => {
        console.log(err.error);
        this.state.busy = false;
      }
    });
  }

}
