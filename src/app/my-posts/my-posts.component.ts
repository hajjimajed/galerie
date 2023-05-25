import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {

  myPosts: any[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.fetchMyPosts();
  }

  fetchMyPosts() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.http.get('http://localhost:8080/post/my-posts', { headers })
      .subscribe(
        (response: any) => {
          this.myPosts = response.posts;
        },
        (error) => {
          console.error('error while retrieving my posts', error);
        }
      )
  }

}
