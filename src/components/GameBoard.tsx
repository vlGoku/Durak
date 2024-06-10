// src/components/GameBoard.tsx

import React, { useState } from 'react';
import { DurakGame } from '../game/DurakGame';
import { Player } from '../models/Player';

const GameBoard: React.FC = () => {
  const [game, setGame] = useState(new DurakGame(['Alice', 'Bob']));

  return (
    <div>
      <h1>Durak</h1>
      <div>
        <h2>Trump Card: {game.trumpCard ? `${game.trumpCard.suit}` : 'None'}</h2>
      </div>
      <div>
        {game.players.map(player => (
          <div key={player.id}>
            <h3>{player.name}</h3>
            <ul>
              {player.hand.map((card, index) => (
                <li key={index}>{card.rank} of {card.suit}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
