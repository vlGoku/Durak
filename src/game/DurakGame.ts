import { Player } from '../models/Player';
import { CardDeck } from '../models/CardDeck';
import { ICard } from '../../ts/interfaces/global_interface';

export class DurakGame {
  players: Player[];
  deck: CardDeck;
  table: { attack: ICard, defense?: ICard }[];
  trumpCard: ICard | undefined;
  currentAttackerIndex: number;
  currentDefenderIndex: number;

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
    this.currentAttackerIndex = 0;
    this.currentDefenderIndex = 1;
  }

  dealCards(): void {
    for (let i = 0; i < 6; i++) {
      for (const player of this.players) {
        const card = this.deck.drawCard();
        if (card) player.addCard(card);
      }
    }
  }

  remainingCardsCount(): number {
    return this.deck.cards.length;
  }

  takeCardsFromTable(): void {
    if (this.currentDefenderIndex !== null) {
      const defender = this.players[this.currentDefenderIndex];
      this.table.forEach(play => {
        if (play.defense) {
          defender.addCard(play.defense);
        }
        defender.addCard(play.attack);
      });
      this.table = [];
    }
  }

  continueAttackPhase(): void {
    // Fülle die Hand des vorherigen Angreifers auf, falls er weniger als 6 Karten hat
    while (this.players[this.currentAttackerIndex].hand.length < 6 && this.deck.cards.length > 0) {
      const card = this.deck.drawCard();
      if (card) {
        this.players[this.currentAttackerIndex].addCard(card);
      }
    }

    // Bestimme den nächsten Angreifer und Verteidiger
    this.currentAttackerIndex = (this.currentDefenderIndex + 1) % this.players.length;
    this.currentDefenderIndex = (this.currentAttackerIndex + 1) % this.players.length;

    // Der neue Angreifer sollte auch Karten ziehen, falls nötig
    while (this.players[this.currentAttackerIndex].hand.length < 6 && this.deck.cards.length > 0) {
      const card = this.deck.drawCard();
      if (card) {
        this.players[this.currentAttackerIndex].addCard(card);
      }
    }
  }

  placeCard(playerIndex: number, card: ICard): void {
    if (playerIndex === this.currentAttackerIndex) {
      this.table.push({ attack: card });
    } else if (playerIndex === this.currentDefenderIndex) {
      const lastAttack = this.table[this.table.length - 1];
      if (!lastAttack.defense) {
        if (this.canDefend(lastAttack.attack, card)) {
          lastAttack.defense = card;
        } else {
          throw new Error('Invalid defense card');
        }
      }
    }
    this.players[playerIndex].hand = this.players[playerIndex].hand.filter(c => c !== card);
  }

  canDefend(attackCard: ICard, defenseCard: ICard): boolean {
    if (attackCard.suit === defenseCard.suit && this.getCardValue(defenseCard) > this.getCardValue(attackCard)) {
      return true;
    }
    if (defenseCard.suit === this.trumpCard?.suit && attackCard.suit !== this.trumpCard?.suit) {
      return true;
    }
    return false;
  }

  getCardValue(card: ICard): number {
    const values: { [key: string]: number } = {
      '6': 6, '7': 7, '8': 8, '9': 9,
      '10': 10, 'J': 11, 'Q': 12,
      'K': 13, 'A': 14
    };
    return values[card.rank];
  }

  defenderMustAct(): boolean {
    return this.table.some(play => !play.defense);
  }

  endTurn(): void {
    if (this.defenderMustAct()) {
      throw new Error('Defender must either defend or take the cards');
    }
    this.currentAttackerIndex = (this.currentAttackerIndex + 1) % this.players.length;
    this.currentDefenderIndex = (this.currentDefenderIndex + 1) % this.players.length;
    this.table = [];
    this.refillHands();
  }

  refillHands(): void {
    for (const player of this.players) {
      while (player.hand.length < 6 && this.deck.cards.length > 0) {
        const card = this.deck.drawCard();
        if (card) player.addCard(card);
      }
    }
  }
}
