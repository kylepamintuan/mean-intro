import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
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
  public token;
  public loginForm: FormGroup;
  public usernameField: AbstractControl;
  public passwordField: AbstractControl;
  public response: any;

  constructor(
    private fb: FormBuilder,
    private reqService: RequestToBackendService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['kyle_p', Validators.required],
      password: ['', Validators.required]
    });
    this.usernameField = this.loginForm.controls.username;
    this.passwordField = this.loginForm.controls.password;
  }

  onSubmit(): void {
    let {username, password} = this.loginForm.value;
    let credentials = { 'username': username, 'password': password }
    console.log(credentials);
    
    this.state.busy = true;

    if(this.token) {
      // send token to backend to get verified
    }

    this.reqService.verifyUser(credentials)
      .subscribe({ 
        next: (response) => {
          console.log(response);

          this.token = (response['token']);
          console.log(this.token);

          window.setTimeout(() => {
            this.state.busy = false;
            // this.router.navigate(['dashboard', username]);
          }, 1000);
        },
        error: (err) => {
          console.log(err.error);
          this.state.busy = false;
        }
      });
  }

}
