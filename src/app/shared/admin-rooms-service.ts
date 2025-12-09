import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminRoomsService {
  url = "http://localhost:8000/api/"

  constructor(
    private http: HttpClient
  ){}

  getRooms$(){
    const link = this.url + "rooms"
    return this.http.get(link)
  }

  getRoom$(id: number){
    const link = this.url + "rooms/" + id
    return this.http.get(link)
  }

  addRoom$(data: any){
    const link = this.url + "rooms"
    return this.http.post(link, data)
  }

  editRoom$(id: number, data: any){
    const link = this.url + "rooms/" + id
    return this.http.put(link, data)
  }

  deleteRoom$(id: number){
    const link = this.url + "rooms/" + id
    return this.http.delete(link)
  }
}
