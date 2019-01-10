import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { RequestToBackendService } from '../request-to-backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reqService: RequestToBackendService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    let {email, password} = this.loginForm.value;
    let credentials = { 'email': email, 'password': password }
    console.log(credentials);

    this.reqService.verifyUser(credentials)
    .subscribe(data => console.log(data));
   }

}
