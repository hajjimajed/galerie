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
  profileImage: File | undefined;
  isUpdate = false;
  selectedProfileImage: File | undefined;

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

  onProfileImageChange(event: any) {
    this.profileImage = event.target.files[0];
    this.selectedProfileImage = event.target.files[0];
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.selectedProfileImage = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  updateUserData() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    const formData: FormData = new FormData();
    formData.append('email', this.userData.email);
    formData.append('name', this.userData.name);
    formData.append('role', this.userData.role);
    if (this.profileImage) {
      formData.append('image', this.profileImage, this.profileImage.name);
    }

    this.http.put<UserDataResponse>('http://localhost:8080/auth/update', formData, { headers })
      .subscribe(
        (response) => {
          console.log('user data updated:', response);
          this.userData = response.user;
          this.toggleUpdate();
        },
        (error) => {
          console.log('error updating user data:', error);
        }
      );
  }

  toggleUpdate() {
    this.isUpdate = !this.isUpdate;
  }

}
