import { Component } from '@angular/core';
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
export class ProfileComponent {

  userData: any;
  userId: string | undefined;
  userEmail: string | undefined;
  userPassword: string | undefined;
  userName: string | undefined;
  userProfileImg: string | undefined;


  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {

  }

  getUserData() {
    const token = this.authService.getToken();
    const userId = this.authService.getUserId();

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.http.get<UserDataResponse>('http://localhost:8080/auth/user-data', { headers })
      .subscribe(
        (response) => {
          const { _id, email, password, name, profileImg, ...otherFields } = response.user;

          this.userId = _id;
          this.userEmail = email;
          this.userPassword = password;
          this.userName = name;
          this.userProfileImg = `http://localhost:8080/${profileImg}`;

          console.log('userId:', this.userId);
          console.log('userEmail:', this.userEmail);
          console.log('userPassword:', this.userPassword);
          console.log('userName:', this.userName);
          console.log('userProfileImg:', this.userProfileImg);
          console.log('other fields:', otherFields);

          this.userData = response.user;
        },
        (error) => {
          console.log('error retrieving user data: ', error);
        }
      )

  }


}
