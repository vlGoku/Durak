import { IPlayer, ICard } from '../../ts/interfaces/global_interface';

export class Player implements IPlayer {
  id: number;
  name: string;
  hand: ICard[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.hand = [];
  }
}