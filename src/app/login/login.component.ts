import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string ="";
  password: string ="";
  memberId: String ="";
  isAdmin: boolean = false;
  constructor(private router: Router,private http: HttpClient) {}
 
  Login() {
    console.log(this.email);
    console.log(this.password);
 
    let bodyData = {
      email: this.email,
      password: this.password,
    };
 
        this.http.post('https://svssapi-production-5075.up.railway.app/api/v1/login', bodyData).subscribe(  (resultData: any) => {
        console.log(resultData);
 
        if (resultData.message == "Email not exits")
        {
      
          alert("Email not exits");
    
 
        }
        else if(resultData.Status == "Login Success")
    
         {
          // localStorage.setItem("token" )
          console.log(resultData.token)
          localStorage.setItem("token" ,resultData.Status)

          this.memberId= resultData.memberId;
          this.isAdmin= resultData.isAdmin;
          console.log(this.memberId)
          localStorage.setItem("memberId" ,resultData.memberId);
          localStorage.setItem("isAdmin" ,resultData.isAdmin)
          alert("User Loged-In Successfully ");
          this.router.navigateByUrl('/home');
        }
        else
        {
          alert("Incorrect Email and Password not match");
        }
      });
    }
}
