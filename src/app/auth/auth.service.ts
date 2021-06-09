import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(true); // {1}
  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(private router:Router) { 
    this.loggedIn.next(false);
  }

  login(user: User){
    if (user.userName !== '' && user.password !== '' ) { // {3}
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
