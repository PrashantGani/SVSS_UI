import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Simulate authentication
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('memberId');
    this.router.navigate(['/login']);
  }

  
}
