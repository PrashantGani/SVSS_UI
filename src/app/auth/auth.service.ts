import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}
  private loggedIn: boolean = false;

  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('token'); // Simulate authentication
  // }

  isLoggedIn(): boolean {
    return this.loggedIn || localStorage.getItem('token') !== null; // Check token existence
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('memberId');
    this.router.navigate(['/login']);
  }

  
}
