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
      password: ['', Validators.required]
    });
    this.usernameField = this.loginForm.controls.username;
    this.passwordField = this.loginForm.controls.password;

    // TODO: Check if token exists
    // if(this.token) {
    //   this.reqService
    //   .verifyToken(this.token)
    //   .subscribe({
    //     next: (response) => {
    //       console.log(response);

    //       if(response['authorized']) {
    //         this.state.busy = false;
    //         console.log('USER REAUTHROIZED BY TOKEN');
    //         // this.router.navigate(['dashboard', username]);
    //       }
    //     }, 
    //     error: (err) => {
    //       console.log(err.error);
    //       this.state.busy = false;
    //     }
    //   });
    // }
  }

  onSubmit(): void {
    let { username, password } = this.loginForm.value;
    let credentials = { 'username': username, 'password': password }
    console.log(credentials);
    
    this.state.busy = true;

    this.reqService
    .verifyUser(credentials)
    .subscribe({ 
      next: (response) => {
        console.log(response);

        if(response['token']) {
          // TODO: store token in browser's local storage
          // this.token = response['token'];
          window.setTimeout(() => {
            this.state.busy = false;
            console.log('USER AUTHORIZED BY LOGIN');
            // this.router.navigate(['dashboard', username]);
          }, 1000);
        }
        else {
          this.state.busy = false;
          // TODO: Client-side login error message
        }
      },
      error: (err) => {
        console.log(err.error);
        this.state.busy = false;
      }
    });
  }

}
