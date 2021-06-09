import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiconfigService {

 
  constructor(private http:HttpClient) {
    this.getConfigdata();

  }

  getConfigdata(): void {
    this.http.get<any>('assets/api.config.json').subscribe(res => {
        sessionStorage.setItem('api_url', res.apiurl);
        sessionStorage.setItem('profile_image_url', res.profile_image_url);
        
      }
    );
  }

}
