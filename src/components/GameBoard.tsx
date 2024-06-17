// src/components/GameBoard.tsx

import React, { useState, useEffect } from 'react';
import { DurakGame } from '../game/DurakGame';
import { ICard } from '../../ts/interfaces/global_interface';

interface GameBoardProps {
  playerNames: string[];
}

const GameBoard: React.FC<GameBoardProps> = ({ playerNames }) => {
  const [game, setGame] = useState<DurakGame | null>(null);
  const [selectedCard, setSelectedCard] = useState<ICard | null>(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number | null>(null);

  useEffect(() => {
    if (playerNames.length > 0) {
      const newGame = new DurakGame(playerNames);
      setGame(newGame);
      setCurrentPlayerIndex(newGame.currentAttackerIndex);
    }
  }, [playerNames]);

  const handleCardSelect = (card: ICard) => {
    setSelectedCard(card);
  };

  const handlePlaceCard = () => {
    if (selectedCard && game) {
      game.placeCard(currentPlayerIndex!, selectedCard);
      setSelectedCard(null);
      if (currentPlayerIndex === game.currentAttackerIndex) {
        setCurrentPlayerIndex(game.currentDefenderIndex);
      } else {
        setCurrentPlayerIndex(game.currentAttackerIndex);
      }
    }
  };

  const handlePass = () => {
    if (game) {
      game.endTurn();
      setSelectedCard(null);
      setCurrentPlayerIndex(game.currentAttackerIndex);
    }
  };

  const handleTakeCardsFromTable = () => {
    if (game) {
      game.takeCardsFromTable();
      game.continueAttackPhase();
      setCurrentPlayerIndex(game.currentAttackerIndex);
    }
  };

  if (!game) {
    return <div>Loading...</div>;
  }

  const currentPlayer = game.players[currentPlayerIndex!];
  const trumpCard = game.trumpCard;

  return (
    <div>
      <div>
        <h1>Durak</h1>
        <div>
          <strong>Players:</strong> {game.players.map(player => player.name).join(', ')}
        </div>
        <div>
          <strong>Trump Card:</strong> {trumpCard ? `${trumpCard.rank} of ${trumpCard.suit}` : 'None'}
        </div>
        <div>
          <strong>Remaining Cards:</strong> {game.remainingCardsCount()}
        </div>
      </div>
      <div>
        <h2>Attacker: {game.players[game.currentAttackerIndex].name}</h2>
        <h2>Defender: {game.players[game.currentDefenderIndex].name}</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ 
            backgroundColor: 'yellow', 
            padding: '20px', 
            border: currentPlayerIndex === game.currentAttackerIndex || currentPlayerIndex === game.currentDefenderIndex 
                    ? '2px solid red' : 'none' 
          }}>
            <h3>Your Hand</h3>
            <h2>Current Player: {game.players[currentPlayerIndex!].name}</h2>
            <div>
              {currentPlayer.hand.map((card, index) => (
                <div
                  key={index}
                  onClick={() => handleCardSelect(card)}
                  style={{
                    border: selectedCard === card ? '2px solid blue' : '1px solid black',
                    padding: '10px',
                    cursor: 'pointer'
                  }}
                >
                  {card.rank} of {card.suit}
                </div>
              ))}
            </div>
          </div>
          <div style={{ backgroundColor: 'orange', padding: '20px' }}>
            <h3>Table</h3>
            <div>
              {game.table.map((play, index) => (
                <div key={index}>
                  Attack: {play.attack.rank} of {play.attack.suit}
                  {play.defense && <span> | Defense: {play.defense.rank} of {play.defense.suit}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <button onClick={handlePlaceCard} disabled={!selectedCard}>Place Card</button>
          <button onClick={handlePass}>Pass</button>
          {game.currentDefenderIndex === currentPlayerIndex && (
            <button onClick={handleTakeCardsFromTable}>Take Cards from Table</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
