import { Component, OnInit} from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { RequestToBackendService } from '../request-to-backend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private user: User;

  constructor(
    private router: Router,
    private reqService: RequestToBackendService
  ) { }

  ngOnInit() { }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
