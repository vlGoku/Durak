export interface IPlayer {
    name: string;
    id: number;
    hand: ICard[];
}

export interface ICard {
    suit: string;
    rank: string;
  }

export interface ICardDeck {
    cards: ICard[];
}