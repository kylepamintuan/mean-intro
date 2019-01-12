import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { RequestToBackendService } from '../request-to-backend.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reqService: RequestToBackendService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    let {username, password} = this.loginForm.value;
    let credentials = { 'username': username, 'password': password }
    console.log(credentials);
    
    this.reqService.verifyUser(credentials)
      .subscribe({ 
        next: (response) => {
          console.log(response);
          this.router.navigate(['dashboard', username]);
        },
        error: (err) => console.log(err.error)
      });
  }

}
