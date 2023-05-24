import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  constructor(
    private authService: AuthService
  ) { }

  isActive: boolean = false;

  isAuth(): boolean {
    // Use the AuthService to check if the user is authenticated
    return !!this.authService.getToken();
  }

  onClickMenu() {
    this.isActive = !this.isActive;
  }

  logout(): void {
    this.authService.logout();
  }

}
