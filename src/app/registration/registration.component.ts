import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../models/user';
import { Validators } from '@angular/forms';
import { RequestToBackendService } from '../request-to-backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  
  public registrationForm: FormGroup;
  response: User;
  
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
   }

   onSubmit(): void {
    let {firstName, lastName, email, username, password} = this.registrationForm.value;
    let newUser = new User(firstName, lastName, email, username, password);
    console.log(newUser);

    this.reqService.addUser(newUser)
    .subscribe({ 
        next: (response) => {
          console.log(response);
          this.router.navigate(['login']);
        },
        error: (err) => console.log(err.error)
    });
   }

}
