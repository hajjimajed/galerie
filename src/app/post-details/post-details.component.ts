import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  postId: string | null = null;
  post: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.getPost();
  }

  getPost() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.http.get(`http://localhost:8080/post/posts/${this.postId}`, { headers })
      .subscribe(
        (response: any) => {
          this.post = response.post;
          console.log(this.post);
        },
        (error) => {
          console.error('error while retrieving post', error);
        }
      )
  }

}
