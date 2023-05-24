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
  profileImg: File | null;
  role: string;

  constructor(
    private http: HttpClient
  ) {
    this.email = '';
    this.password = '';
    this.name = '';
    this.profileImg = null;
    this.role = '';
  }

  onFileSelected(event: any) {
    this.profileImg = event.target.files[0];
  }


  submitForm() {
    const formData = new FormData();
    formData.append('email', this.email);
    formData.append('password', this.password);
    formData.append('name', this.name);
    if (this.profileImg) {
      formData.append('image', this.profileImg);
    }
    formData.append('role', this.role);

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
