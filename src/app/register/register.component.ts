import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  email: string;
  password: string;
  name: string;
  profileImg: String;
  role: string;

  constructor(
    private http: HttpClient
  ) {
    this.email = '';
    this.password = '';
    this.name = '';
    this.profileImg = '';
    this.role = '';
  }


  submitForm() {
    const formData = {
      email: this.email,
      password: this.password,
      name: this.name,
      profileImg: this.profileImg,
      role: this.role
    };

    this.http.put('http://localhost:8080/auth/signup', formData)
      .subscribe(
        (response) => {
          console.log('Form submitted successfully:', response);
          // Handle any further actions after successful form submission
        },
        (error) => {
          console.log('Error submitting form:', error);
          // Handle any error during form submission
        }
      );
  }

}
