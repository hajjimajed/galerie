import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

interface UserDataResponse {
  message: string;
  user: any;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  searchQuery: string = ''; // Initialize with an empty string
  searchResults: any[] = []; // Initialize as an empty array
  currentDate: string;

  userData: any;

  isShrunk: boolean = false;

  hideRightBar: boolean = true;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {
    this.currentDate = this.getFormattedDate();
  }

  ngOnInit() {
    this.getUserData();
    this.currentRoute();
  }

  private getFormattedDate(): string {
    const date = new Date();
    return formatDate(date, 'EEEE, d MMMM yyyy', 'en-US');
  }

  isActive: boolean = false;

  isAuth(): boolean {
    // Use the AuthService to check if the user is authenticated
    return !!this.authService.getToken();
  }

  onClickMenu() {
    this.isActive = !this.isActive;
  }

  hideNavMenuContainer() {
    this.isActive = false; // Assuming `isActive` is a boolean property controlling the visibility of `nav-menu-container`
  }

  logout(): void {
    this.authService.logout();
  }


  searchPosts() {
    if (this.searchQuery) {
      const url = `http://localhost:8080/post/search-posts?q=${encodeURIComponent(this.searchQuery)}`;

      this.http.get(url)
        .subscribe((response: any) => {
          this.searchResults = response.posts;
        }, (error) => {
          console.error('Error occurred during search:', error);
          this.searchResults = [];
        });
    } else {
      this.searchResults = [];
    }
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

  currentRoute() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          this.hideRightBar = false;
        } else {
          this.hideRightBar = true;
        }
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isShrunk = (window.scrollY > 0); // Update the isShrunk flag based on scroll position
  }
}
