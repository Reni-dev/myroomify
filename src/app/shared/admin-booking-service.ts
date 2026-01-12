import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminBookingService {
  url = "http://localhost:8000/api/bookings/"

  constructor(
    private http: HttpClient
  ){}

  getBookings$(){
    return this.http.get(this.url)
  }

  getBooking$(id: number){
    return this.http.get(this.url + id)
  }

  addBooking$(data: any){
    return this.http.post(this.url, data)
  }

  editBooking$(data: any){
    return this.http.put(this.url,  data)
  }

  deleteBooking$(id: number){
    return this.http.delete(this.url + id)
  }
}
