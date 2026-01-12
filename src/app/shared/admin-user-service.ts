import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminUserService {
  url = "http://localhost:8000/api/users/"

  constructor(
    private http: HttpClient
  ){}

  getUsers$(){
    return this.http.get(this.url)
  }

  getUser$(id: number){
    return this.http.get(this.url + id)
  }
}
