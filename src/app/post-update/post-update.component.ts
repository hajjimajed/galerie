import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.scss']
})
export class PostUpdateComponent implements OnInit {

  postId: string | null = null;
  title: string;
  description: string;
  category: string;
  image: File | null;

  post: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.title = '';
    this.description = '';
    this.category = '';
    this.image = null;
  }

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



  onSubmit() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    const formData = new FormData();
    formData.append('title', this.post.title);
    formData.append('description', this.post.description);
    formData.append('category', this.post.category);
    if (this.image) {
      formData.append('image', this.image);
    }

    this.http.put(`http://localhost:8080/post/posts/${this.postId}`, formData, { headers })
      .subscribe(
        (Response: any) => {
          this.post = Response.post;
          this.router.navigate(['/my-posts']);
        },
        (error) => {
          console.error('error while updating post', error);
        }
      )
  }

  onFileSelected(event: any) {
    this.image = event.target.files[0];
  }

}
