import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminRoomsService } from '../../shared/admin-rooms-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-room',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-room.html',
  styleUrl: './admin-room.css',
})
export class AdminRoom implements OnInit{
  [x: string]: any;

  roomId!: number
  roomForm: any
  showModal = false
  imageForm: any
  selectedFile: File | null = null
  mainImageUrl: string = ''
  roomImages: any[] = [] 
  originalImageUrl: string = ''

  constructor(
    private builder: FormBuilder,
    private roomApi: AdminRoomsService,
    private activated: ActivatedRoute,
    private router: Router  
  ) { }

  ngOnInit(): void {
    this.roomForm = this.builder.group({
      image: [''],
      name: [''],      
      capacity: [''],
      description: [''],
      price: [''],
      equipment: [''], 
      status: ['']
    })
    this.imageForm = this.builder.group({
        image: [''],
    })
    this.activated.paramMap.subscribe(params => {
        const id = params.get('id')
        
        if (id) {
            this.roomId = +id
            this.get(this.roomId)
        }
    });
  }

  get(id:number){
    this.roomApi.getRoom$(id).subscribe({
        next: (data: any) => {
            this.roomForm.patchValue(data)
            const mainImageObject = this.roomImages.length > 0 ? this.roomImages[0] : null
            this.originalImageUrl = mainImageObject ? mainImageObject.url : ''

            if (this.originalImageUrl) {                
             this.mainImageUrl = this.addCacheBuster(this.originalImageUrl)
            }
        },
        error: (err) => {
            console.error(err)
        }
    });
  }

addCacheBuster(url: string): string {
    return `${url}?t=${new Date().getTime()}`;
}

  addImage(): void {
    if (!this.selectedFile) {
        Swal.fire(
          'Figyelem', 
          'Kérjük, válasszon ki egy képet!',
          'warning'
        );
        return;
    }
    this.showModal = false;
    
    Swal.fire({
        icon: 'success',
        title: 'Kép kiválasztva',
        text: 'A kép a "Save changes" gomb megnyomásakor kerül feltöltésre.',
        showConfirmButton: false,
        timer: 1500
    });
  }

  selectedImages(event: any){
      const fileList: FileList = event.target.files;

      if (fileList && fileList.length > 0) {
          this.selectedFile = fileList[0]
          const reader = new FileReader()
          reader.onload = (e: any) => {
            this.mainImageUrl = e.target.result;
        }
        reader.readAsDataURL(this.selectedFile!)
      } else {
          this.selectedFile = null
          this.mainImageUrl = ''
      }
  }

  edit(roomForm: any){
    this.roomApi.editRoom$(this.roomId, this.roomForm.value).subscribe({
      next: (result: any) => {
        console.log(result)
        this.editSuccess()
      },
      error: (err: any) => {
        console.log(err)
        this.editFailed()
      }
    })
  }

  editSuccess(){
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your room has been updated",
      showConfirmButton: false,
      timer: 2500
    });
  }

  editFailed(){
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops, something went wrong",
      showConfirmButton: false,
      timer: 2500
    });
  }

  confirmNavigate(){
    Swal.fire({
      title: "Are you sure?",
      text: "Unsaved changes will be lost!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#364e43",
      cancelButtonColor: "rgba(0, 0, 0, 1)",
      confirmButtonText: "Go back to rooms"
    }).then((result) => {
      if (result.isConfirmed) {
        this.backToRooms()
      }
    });
  }
  backToRooms(){
    this.router.navigate(['navbar/rooms'])
  }

  setShowModal(){
    this.showModal = true
  }

  cancel(){
    this.showModal = false
  }

}
