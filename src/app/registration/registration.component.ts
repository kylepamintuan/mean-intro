import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { RequestToBackendService } from '../request-to-backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  
  public state = {
    busy: false,
    valid: false
  };

  public registrationForm: FormGroup;
  public firstNameField: AbstractControl;
  public lastNameField: AbstractControl;
  public emailField: AbstractControl;
  public usernameField: AbstractControl;
  public passwordField: AbstractControl;
  
  constructor(
    private fb: FormBuilder,
    private reqService: RequestToBackendService,
    private router: Router
  ) { }

   ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.firstNameField = this.registrationForm.controls.firstName;
    this.lastNameField = this.registrationForm.controls.lastName;
    this.emailField = this.registrationForm.controls.email;
    this.usernameField = this.registrationForm.controls.username;
    this.passwordField = this.registrationForm.controls.password;
   }

   onSubmit(): void {
    let {firstName, lastName, email, username, password} = this.registrationForm.value;
    let newUser = {firstName, lastName, email, username, password};
    console.log(newUser);

    this.state.busy = true;

    this.reqService
    .sendRequest('POST', 'http://localhost:3000/api/registration', false, "application/json", newUser)
    .subscribe({
        next: (response) => {
          console.log(response);
          window.setTimeout(() => {
            this.state.busy = false;
            this.router.navigate(['login']);
          }, 1000);
        },
        error: (err) => {
          console.log(err);
          this.state.busy = false;
        }
    });
   }

}
