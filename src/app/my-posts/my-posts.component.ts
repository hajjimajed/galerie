import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {

  myPosts: any[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
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

  deletePost(postId: string) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.http.delete(`http://localhost:8080/post/posts/${postId}`, { headers })
      .subscribe(
        (response: any) => {
          console.log('post deleted');
          this.myPosts = this.myPosts.filter(post => post._id !== postId);
        },
        (error) => {
          console.error('error while deleting post', error);
        }
      )
  }

  postDetails(postId: string) {
    this.router.navigate([`/post/${postId}`]);
  }

  postUpdate(postId: string) {
    this.router.navigate([`/update-post/${postId}`]);
  }

}
