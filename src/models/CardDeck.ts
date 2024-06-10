import { ICardDeck, ICard } from "../../ts/interfaces/global_interface";

const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export class CardDeck implements ICardDeck {
    cards: ICard[];

    constructor() {
        this.cards = [];
        this.initializeDeck();
    }

    initializeDeck(): void {
        for(const suit of suits) {
            for (const rank of ranks ){
                this.cards.push({ suit, rank});
            }
        }
        this.shuffle();
    }

    shuffle(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    drawCard(): ICard | undefined {
        return this.cards.pop();
    }
}