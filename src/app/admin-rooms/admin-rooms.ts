import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface CardData {
  id: number,
  roomName: string,
  description: string
}

@Component({
  selector: 'app-admin-rooms',
  imports: [CommonModule],
  templateUrl: './admin-rooms.html',
  styleUrl: './admin-rooms.css',
})


export class AdminRooms {
  cards: CardData[] = [
    { id: 1, roomName: 'Béta', description: 'Dinamikusan hozzáadott szoba.' }
  ]

  nextId: number = 2

  constructor() {}

  addCard(): void {
    const newCard: CardData = {
      id: this.nextId++,
      roomName: `Delta ${this.nextId - 1}`,
      description: 'Dinamikusan hozzáadott szoba.'
    };
    
    this.cards.push(newCard);
  }
}
