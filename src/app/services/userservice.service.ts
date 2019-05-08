import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http: HttpClient) { }

  register(user: User) : any{
    let url='http://localhost:8091/users/registration';
    return this.http.post(url, user).subscribe((response)=>{
      return response;
    });
  }
}
