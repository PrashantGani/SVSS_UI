import { Injectable } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private login: LoginComponent) { }

  // private memberId : String = '';
  
  getMemberId(){
    return this.login.memberId;
  }
}
