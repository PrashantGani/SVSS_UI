import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html', // Ensure this path is correct
  styleUrls: ['./forgot-password.component.scss'], // Ensure the style path is correct
})
export class ForgotPasswordComponent {
  email: string = ''; // For the email input
  otp: string = ''; // For the OTP input
  message: string = ''; // To display success/error messages
  otpSent: boolean = false; // Controls whether to show the OTP input
  // router: any;

  constructor(private http: HttpClient,private router: Router) {}

  // Function to send OTP to the email
  onSubmit() {
    if (this.email) {
      const apiUrl = 'https://svssapi-production-5075.up.railway.app/api/v1/forgot';
      const params = new HttpParams().set('email', this.email);

      this.http.post(apiUrl, {}, { params }).subscribe({
        next: () => {
          this.otpSent = true; // OTP has been sent successfully
          this.message = 'OTP sent to your email address.';
        },
        error: (error: any) => {
          this.message = 'Error occurred while sending OTP. Please try again.';
          console.error('Error:', error);
        }
      });
    }
  }

  // Function to verify the OTP
  verifyOtp() {
    if (this.otp) {
      const apiUrl = 'https://svssapi-production-5075.up.railway.app/api/v1/verify';
      const params = new HttpParams().set('otp', this.otp);
  
      // console.log("this.otp",this.otp)
      this.http.post(apiUrl, {}, { params }).subscribe({
        next: (response: any) => {
          // Handle the response
          console.log("response",response)
          console.log(response.status)
          if (response) {
            // OTP verified successfully, show success message and navigate to change-password page
            this.message = response.message;
            this.router.navigate(['/reset-password']);
          } else {
            // OTP verification failed, show failure message and keep on the same page
            this.message = response.message || 'Invalid OTP. Please try again.';
          }
        },
        error: (error: any) => {
          // Handle the error response, display error message but do not navigate
          if (error.error && error.error.message) {
            this.message = error.error.message;
          } else {
            this.message = 'Invalid OTP. Please try again.'; // Fallback error message
          }
          console.error('Error:', error);
        }
      });
    }
  }
  
}
