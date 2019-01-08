import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../models/user';
import { Validators } from '@angular/forms';
import { RequestToBackendService } from '../request-to-backend.service';

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
    private reqService: RequestToBackendService
    ) {}

   ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

   onSubmit(): void {
    let {firstName, lastName, email, password} = this.registrationForm.value;
    let newUser = new User(firstName, lastName, email, password);
    console.log(newUser);

    this.reqService.addUser(newUser)
    .subscribe(data => console.log(data));
   }

}
