// src/models/CardDeck.ts

import { ICard } from '../../ts/interfaces/global_interface';

export class CardDeck {
  cards: ICard[];

  constructor() {
    this.cards = this.generateDeck();
  }

  generateDeck(): ICard[] {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck: ICard[] = [];

    for (const suit of suits) {
      for (const rank of ranks) {
        deck.push({ rank, suit });
      }
    }

    return this.shuffle(deck);
  }

  shuffle(cards: ICard[]): ICard[] {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }

  drawCard(): ICard | undefined {
    return this.cards.pop();
  }
}
