import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  memberName: string ="";
  email: string ="";
  password: string ="";
  number: string ="";
  otpSent: boolean = false; // Flag to show/hide OTP input
  otp: string ="";

  constructor(private http: HttpClient, private router: Router) { }

  save(registerForm: NgForm) {
    if (registerForm.invalid) {
      Object.keys(registerForm.controls).forEach(control => {
        registerForm.controls[control].markAsTouched();
      });
      return;
    }
  
    let bodyData = {
      "memberName" : this.memberName,
      "email" : this.email,
      "password" : this.password,
      "number" :this.number
    };
    this.http.post("https://svssapi-production.up.railway.app/api/v1/register",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        // this.router.navigate(['/login']);
        this.otpSent = true;
        alert("OTP Sent to the Registerd email Please varify your email ");
        // this.router.navigate(['/login']);
    });
  }

  verifyOtp() {
    if (this.otp) {
      const params = new HttpParams().set('otp', this.otp);
      const apiUrl = 'https://svssapi-production.up.railway.app/api/v1/verify';

    // Call OTP verification API
    this.http.post(apiUrl,{},{params}).subscribe((response: any) => {
      if (response.message) {
        // Redirect to login page on OTP validation success
        alert("Member Registered Successfully.!");
        this.router.navigate(['/login']);
      } else {
        alert('Invalid OTP');
      }
    }, (error) => {
      console.error('OTP validation failed', error);
    });
  }
}
}
