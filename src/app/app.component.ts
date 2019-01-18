import { Component, OnInit } from '@angular/core';
import { RequestToBackendService } from './request-to-backend.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'MEAN Application';

  constructor(
    private reqService: RequestToBackendService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reqService
    .sendRequest('GET', 'http://localhost:3000/api/reauthorize', true, "application/json")
    .subscribe({
      next: (response) => {
        console.log(response);

        if(response.hasOwnProperty('body')) {
          response = JSON.stringify(response.body);
          let resObj = JSON.parse(response);

          if(resObj.authorized) {
            console.log('User reauthorized via web token');
            this.router.navigate(['dashboard', resObj.username]);
          }
          else {
            this.router.navigate(['login']);
          }
        }
      }, 
      error: (err) => {
        console.log(err);
      }
    });
  }
}
