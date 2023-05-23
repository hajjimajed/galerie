import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';

interface LoginResponse {
  token: string;
  userId: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string;
  password: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.email = '';
    this.password = '';
  }

  submitForm() {
    const formData = {
      email: this.email,
      password: this.password
    }

    this.http.post<LoginResponse>('http://localhost:8080/auth/login', formData)
      .subscribe(
        (response) => {
          console.log('user logged successfully', response);
          const token = response.token;
          const userId = response.userId;
          this.authService.setToken(token);
          this.authService.setUserId(userId);
        },
        (error) => {
          console.log('Error occured', error)
        }
      )
  }

}
