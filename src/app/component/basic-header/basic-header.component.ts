import { Component, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-basic-header',
  templateUrl: './basic-header.component.html',
  styleUrls: ['./basic-header.component.css']
})
export class BasicHeaderComponent implements OnInit {

  IsLoggedIn$: Observable<boolean>;                  // {1}

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.IsLoggedIn$ = this.authService.isLoggedIn; 
    console.log(this.IsLoggedIn$);// {2}
  }

  onLogout(){
    
    console.log(this.IsLoggedIn$);// {2}
    this.IsLoggedIn$ = this.authService.isLoggedIn; 
    this.authService.logout();                      // {3}
  }

}
