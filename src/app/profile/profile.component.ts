import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface UserDataResponse {
  message: string;
  user: any;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userData: any;

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    const token = this.authService.getToken();
    const userId = this.authService.getUserId();

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.http.get<UserDataResponse>('http://localhost:8080/auth/user-data', { headers })
      .subscribe(
        (response) => {
          console.log('user data : ', response);
          this.userData = response.user;
        },
        (error) => {
          console.log('error retrieving user data: ', error);
        }
      )

  }



}
