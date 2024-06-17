// src/game/DurakGame.ts

import { Player } from '../models/Player';
import { CardDeck } from '../models/CardDeck';
import { ICard } from '../../ts/interfaces/global_interface';

export class DurakGame {
  players: Player[];
  deck: CardDeck;
  table: ICard[];
  trumpCard: ICard | undefined;

  constructor(playerNames: string[]) {
    if (!playerNames || playerNames.length === 0) {
      throw new Error('Player names are required to start the game');
    }
    if (playerNames.length > 4) {
      throw new Error('A maximum of 4 players are allowed');
    }
    this.players = playerNames.map((name, index) => new Player(index, name));
    this.deck = new CardDeck();
    this.table = [];
    this.dealCards();
    this.trumpCard = this.deck.drawCard();
  }

  dealCards(): void {
    for (let i = 0; i < 6; i++) {
      for (const player of this.players) {
        const card = this.deck.drawCard();
        if (card) player.addCard(card);
      }
    }
  }

  // Weitere Spiel-Logik wie Angriff, Verteidigung, etc.
}
