import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminBookingService } from '../../shared/admin-booking-service';
import { AdminRoomsService } from '../../shared/admin-rooms-service';
import { FormBuilder } from '@angular/forms';
import { AdminUserService } from '../../shared/admin-user-service';

@Component({
  selector: 'app-admin-users',
  imports: [],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
})
export class AdminUsers {
  showModal = false
  bookings: any[] = []
  filteredUsers: any[] = []
  userForm: any
  users: any
  rooms: any

  constructor(
    private bookApi: AdminBookingService,
    private roomApi: AdminRoomsService,
    private userApi: AdminUserService,
    private builder: FormBuilder
  ){}

  ngOnInit(){
    this.getBookings()
    this.getUsers()
    this.getRooms()
    this.userForm = this.builder.group({
      id: [''],
      user: [''],
      guest_name: [''],
      guest_email: [''],
    })
  }


  // Crud eleje
  // read
  getUsers(){
    this.userApi.getUsers$().subscribe({
      next: (result: any) => {
        console.log(result)
        this.users = result
        console.log(this.users)
        this.filteredUsers = result
      },
      error: (err: any) => {
        console.log(err)
      } 
    })
  }

  getRooms(){
    this.roomApi.getRooms$().subscribe({
      next: (result: any) => {
        console.log(result)
        this.rooms = result
      },
      error: (err: any) => {
        console.log(err)
      } 
    })
  }

  getBookings(){
    this.bookApi.getBookings$().subscribe({
      next: (result: any) => {
        console.log(result)
        this.bookings = result
      },
      error: (err: any) => {
        console.log(err)
      } 
    })
  }

  about(data:any){

  }

  //delete
  deleteUser(id: number){
    this.userApi.deleteUser$(id).subscribe({
      next: (result: any) => {
        console.log(result)
        this.getUsers()
        this.success("User has been deleted")
      },
      error: (err: any) => {
        console.log(err)
        this.error()
      }
    })
  }
  
  confirmDelete(id: number){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bb5127",
      cancelButtonColor: "rgba(0, 0, 0, 1)",
      confirmButtonText: "Delete"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUser(this.userForm.value.id)
      }
    });
  }
  //Crud vége
  
  //Alert
  success(errorText: string){
    Swal.fire({
      position: "center",
      icon: "error",
      title: errorText,
      showConfirmButton: false,
      timer: 2500
    });
  }

  error(){
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops, something went wrong",
      showConfirmButton: false,
      timer: 2500
    });
  }

  //Modal
  setShowModal(){
    this.showModal = true
  }

  cancel(){
    this.showModal = false
    this.userForm.reset()
  }

  //Search
  onSearch(event: any) {
    const term = event.target.value.toLowerCase()
    this.filteredUsers = this.bookings.filter(booking => 
      booking.username?.toLowerCase().includes(term) ||
      booking.id.toString().includes(term)
    )
  }

  onSort(event: any) {
    const key = event.target.value;
    
    this.filteredUsers.sort((firstUser, secondUser) => {
      let dataFirst = firstUser[key]
      let dataSecond = secondUser[key]

      if(key === 'user') {
        dataFirst = firstUser.user?.username
        dataSecond = secondUser.user?.username
      }

      if(dataFirst < dataSecond) return -1
      if(dataFirst > dataSecond) return 1
      return 0
    })
  }
}

