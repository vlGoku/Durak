// src/models/Player.ts

import { ICard } from '../../ts/interfaces/global_interface';

export class Player {
  id: number;
  name: string;
  hand: ICard[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.hand = [];
  }

  addCard(card: ICard): void {
    this.hand.push(card);
  }
}
