import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  email: string ="";
  newPassword: string ="";
  confirmPassword: string ="";
  message: string = ''; // To display success/error messages
  constructor(private router: Router,private http: HttpClient) {}

  resetPWD() {
    const apiUrl = 'http://localhost:8080/api/v1/reset'; // Replace with actual API URL
  
    // Create HttpParams to pass the fields as query parameters
    let params = new HttpParams()
      .set('email', this.email)
      .set('newPassword', this.newPassword)
      .set('confirmPassword', this.confirmPassword);
  
    // Make the POST request with query parameters
    this.http.post(apiUrl, {}, { params }).subscribe({
      next: (response: any) => {
        // Handle success response from the backend
        if (response && response.message) {
          this.message = response.message;
          alert("Password has been modified Successfully.!");
          // Navigate to login page if password reset is successful
          this.router.navigate(['/login']);
        } else {
          // Show error message from response
          this.message = 'Password reset failed.';
        }
      },
      error: (error: any) => {
        // Handle error response from the backend
        if (error.error && error.error.message) {
          this.message = error.error.message;
        } else {
          this.message = 'Error occurred while resetting the password. Please try again.';
        }
        console.error('Error:', error);
      }
    });
  }
  
}