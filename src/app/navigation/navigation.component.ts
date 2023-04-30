import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  isActive: boolean = false;

  onClickMenu() {
    this.isActive = !this.isActive;
  }


}
