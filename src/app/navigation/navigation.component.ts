import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  searchQuery: string = ''; // Initialize with an empty string
  searchResults: any[] = []; // Initialize as an empty array

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

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
}
