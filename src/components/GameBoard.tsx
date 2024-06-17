// src/components/GameBoard.tsx

import React, { useState, useEffect } from 'react';
import { DurakGame } from '../game/DurakGame';

interface GameBoardProps {
  playerNames: string[];
}

const GameBoard: React.FC<GameBoardProps> = ({ playerNames }) => {
  const [game, setGame] = useState<DurakGame | null>(null);

  useEffect(() => {
    if (playerNames && playerNames.length > 0) {
      const newGame = new DurakGame(playerNames);
      setGame(newGame);
    }
  }, [playerNames]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Durak</h1>
      <div>
        <h2>Trump Card: {game.trumpCard ? `${game.trumpCard.rank} of ${game.trumpCard.suit}` : 'None'}</h2>
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
      {/* Weitere Benutzeroberfläche wie Angriffs- und Verteidigungsaktionen */}
    </div>
  );
};

export default GameBoard;
