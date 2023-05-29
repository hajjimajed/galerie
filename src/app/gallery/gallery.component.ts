import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  posts: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.http.get('http://localhost:8080/post/posts').subscribe(
      (response: any) => {
        this.posts = response.posts.map((post: any) => ({
          ...post,
          formattedDate: this.formatDate(post.date),
        }));
      },
      (error) => {
        console.error('Error while retrieving posts', error);
      }
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return date.toLocaleDateString('en-US', options);
  }

}
