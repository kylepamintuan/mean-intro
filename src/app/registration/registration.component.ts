import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from '../models/user';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  
  constructor(private fb: FormBuilder) {}

   ngOnInit() {}

   onSubmit() {
     const result: User = Object.assign({

     })
   }

}
