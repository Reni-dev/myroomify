import { Component } from '@angular/core'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { DatePipe } from '@angular/common'
import Swal from 'sweetalert2'
import { AdminBookingService } from '../../shared/admin-booking-service'
import { AdminRoomsService } from '../../shared/admin-rooms-service'
// import { AdminUserService } from '../../shared/admin-user-service'

@Component({
  selector: 'app-admin-bookings',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './admin-bookings.html',
  styleUrl: './admin-bookings.css',
})
export class AdminBookings {
  
  showModal = false
  bookings: any[] = []
  filteredBookings: any[] = []
  bookingForm: any
  addMode = true
  users: any
  rooms: any

  constructor(
    private bookApi: AdminBookingService,
    private roomApi: AdminRoomsService,
    // private userApi: AdminUserService,
    private builder: FormBuilder
  ){}

  ngOnInit(){
    this.getBookings()
    // this.getUsers()
    this.getRooms()
    this.bookingForm = this.builder.group({
      id: [''],
      // user: [''],
      room: [''],
      check_in: [''],
      check_out: [''],
      booking_type: [''],
      status: [''],
      payment_status: [''],
      guest_name: [''],
      guest_email: [''],
      guest_phone: [''],
    })
  }


  //Crud eleje
  //read
  // getUsers(){
  //   this.userApi.getUsers$().subscribe({
  //     next: (result: any) => {
  //       console.log(result)
  //       this.users = result
  //       console.log(this.users)
  //     },
  //     error: (err: any) => {
  //       console.log(err)
  //     } 
  //   })
  // }

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
        this.filteredBookings = result
      },
      error: (err: any) => {
        console.log(err)
      } 
    })
  }

 //create
  addBooking(){
    this.bookApi.addBooking$(this.bookingForm.value).subscribe({
      next: (result: any) => {
        console.log(result)
        this.getBookings()
        this.showModal = false
        this.bookingForm.reset()
        this.success("Booking has been added")
      },
      error: (err: any) => {
        console.log(err)
        this.error()
      }
    })
  }

  //update
  getForEdit(booking: any){
    console.log(booking)

    const bookingToPatch = { ...booking };
    if (bookingToPatch.user && bookingToPatch.user.id) {
        bookingToPatch.user = bookingToPatch.user.id; 
    }
    if (bookingToPatch.room && bookingToPatch.room.id) {
        bookingToPatch.room = bookingToPatch.room.id;
    }

    if (booking.check_in) {
      booking.check_in = booking.check_in.slice(0, 10); 
    }
    if(booking.check_out) {
      booking.check_out = booking.check_out.slice(0, 10);
    }
    this.bookingForm.patchValue(booking)
    this.addMode = false;
  }

  editBooking(){
    this.bookApi.editBooking$(this.bookingForm.value).subscribe({
      next: (result: any) => {
        console.log(result)
        this.getBookings()
        this.showModal = false
        this.bookingForm.reset()
        this.success("Booking has been updated")
      },
      error: (err: any) => {
        console.log(err)
        this.error()
      }
    })
  }

  //delete
  deleteBooking(id: number){
    this.bookApi.deleteBooking$(id).subscribe({
      next: (result: any) => {
        console.log(result)
        this.getBookings()
        this.success("Booking has been deleted")
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
        this.deleteBooking(this.bookingForm.value.id)
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
    this.bookingForm.reset()
  }

  save(){
    if(this.addMode){
      this.addBooking()
    }else{
      this.editBooking()
    }
  }

  //Search
  onSearch(event: any) {
    const term = event.target.value.toLowerCase()
    this.filteredBookings = this.bookings.filter(booking => 
      booking.guest_name?.toLowerCase().includes(term) || 
      booking.guest_email?.toLowerCase().includes(term) ||
      booking.id.toString().includes(term)
    )
  }

  onSort(event: any) {
    const key = event.target.value;
    
    this.filteredBookings.sort((firstBooking, secondBooking) => {
      let dataFirst = firstBooking[key]
      let dataSecond = secondBooking[key]

      if(key === 'user') {
        dataFirst = firstBooking.user?.name
        dataSecond = secondBooking.user?.name
      }
      if(key === 'room') {
        dataFirst = firstBooking.room?.name
        dataSecond = secondBooking.room?.name
      }

      if(dataFirst < dataSecond) return -1
      if(dataFirst > dataSecond) return 1
      return 0
    })
  }
}
