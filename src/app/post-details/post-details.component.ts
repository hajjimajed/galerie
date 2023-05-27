import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';


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
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.postId = params.get('id');
        return this.getPost();
      })
    )
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

  getPost() {
    return this.http.get(`http://localhost:8080/post/posts/${this.postId}`)
  }

}
