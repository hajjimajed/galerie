import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  posts: any[] = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.http.get('http://localhost:8080/post/posts')
      .subscribe(
        (response: any) => {
          this.posts = response.posts;
        },
        (error) => {
          console.error('error while retrieving posts', error);
        }
      )
  }

}
