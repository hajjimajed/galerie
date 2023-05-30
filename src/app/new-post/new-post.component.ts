import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router'

interface UserDataResponse {
  message: string;
  user: any;
}

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  title: string;
  description: string;
  category: string;
  image: File | null;

  userData: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.title = '';
    this.description = '';
    this.category = '';
    this.image = null;
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

  onSubmit() {
    const token = this.authService.getToken();

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('category', this.category);
    if (this.image) {
      formData.append('image', this.image);
    }

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token)

    this.http.post('http://localhost:8080/post/new-post', formData, { headers })
      .subscribe(
        (response) => {
          console.log('post created successfully');
          this.router.navigate(['/gallery']);
        },
        (error) => {
          console.error('error while creating post', error);
        }
      )
  }

  onFileSelected(event: any) {
    this.image = event.target.files[0];
  }

}
