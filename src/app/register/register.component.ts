import { HttpClient } from '@angular/common/http';
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
  // router: any;
   // Inject the Router in the constructor
   constructor(private http: HttpClient, private router: Router) { }
  //  constructor(private http: HttpClient) { }
  save(registerForm: NgForm) {
    // Check if the form is valid before submitting
    if (registerForm.invalid) {
      // If the form is invalid, mark all controls as touched so the validation messages show up
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
    this.http.post("http://localhost:8080/api/v1/register",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        // this.router.navigate(['/login']);
        alert("User Registered Successfully");
        this.router.navigate(['/login']);
    });
  }
}
