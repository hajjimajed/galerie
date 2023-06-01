import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';


interface UserDataResponse {
  message: string;
  user: any;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  posts: any[] = [];
  userData: any;

  postContainerVisible = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.fetchPosts();
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




  togglePostContainer() {
    this.postContainerVisible = !this.postContainerVisible;
  }

}
