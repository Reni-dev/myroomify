import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestRooms } from './guest-rooms';

describe('GuestRooms', () => {
  let component: GuestRooms;
  let fixture: ComponentFixture<GuestRooms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestRooms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestRooms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
