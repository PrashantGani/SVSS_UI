import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isAdmin: boolean = false;

  constructor(private authService: AuthService){
    const storedIsAdmin = localStorage.getItem("isAdmin"); 
    console.log("Admin status from local storage ",storedIsAdmin);
    this.isAdmin = storedIsAdmin === "true"; // Convert to boolean
  }


  
  logout() {
    this.authService.logout(); // Call logout method from AuthService
    // this.router.navigate(['/login']);
  }
}
