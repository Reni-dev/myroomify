import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminRoomsService } from '../shared/admin-rooms-service';

@Component({
  selector: 'app-admin-room',
  imports: [],
  templateUrl: './admin-room.html',
  styleUrl: './admin-room.css',
})
export class AdminRoom implements OnInit{

  roomId!: number
  roomForm: any

  constructor(
    private builder: FormBuilder,
    private roomApi: AdminRoomsService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.roomForm = this.builder.group({
      name: [''],      
      capacity: [''],
      description: [''],
      price: [''],
      equipment: [''], 
      status: ['']
    })
    this.router.paramMap.subscribe(params => {
        const id = params.get('id');
        
        if (id) {
            this.roomId = +id;
            this.get(this.roomId)
        }
    });
  }

  get(id:number){
    this.roomApi.getRoom$(id).subscribe({
        next: (data: any) => {
            this.roomForm.patchValue(data);
        },
        error: (err) => {
            console.error(err);
        }
    });
  }

}
