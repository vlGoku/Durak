// GameBoard.tsx

import React, { useState, useEffect } from "react";
import { DurakGame } from "../game/DurakGame";
import { ICard } from "../../ts/interfaces/global_interface";

interface GameBoardProps {
  playerNames: string[];
}

const GameBoard: React.FC<GameBoardProps> = ({ playerNames }) => {
  const [game, setGame] = useState<DurakGame | null>(null);
  const [selectedCard, setSelectedCard] = useState<ICard | null>(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

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
      try {
        game.placeCard(currentPlayerIndex!, selectedCard);
        setSelectedCard(null);
        if (currentPlayerIndex === game.currentAttackerIndex) {
          setCurrentPlayerIndex(game.currentDefenderIndex);
        } else {
          setCurrentPlayerIndex(game.currentAttackerIndex);
        }
        setError(null);
      } catch (error) {
        setError((error as Error).message);
      }
    }
  };

  const handlePass = () => {
    if (game && currentPlayerIndex === game.currentAttackerIndex) {
      game.endTurn();
      setSelectedCard(null);
      setCurrentPlayerIndex(game.currentAttackerIndex);
      setError(null);
    } else if (game && currentPlayerIndex === game.currentDefenderIndex) {
      try {
        game.takeCardsFromTable();
        game.continueAttackPhase();
        setSelectedCard(null);
        setCurrentPlayerIndex(game.currentAttackerIndex);
        setError(null);
      } catch (error) {
        setError((error as Error).message);
      }
    }
  };

  const handleNewGame = () => {
    setGame(null); // Setze das Spiel zurück
    setCurrentPlayerIndex(null);
    setSelectedCard(null);
    setError(null);
    window.location.href = "/"; // Hier wird die Seite direkt zur Startseite umgeleitet
  };

  if (!game) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  }

  const currentPlayer = game.players[currentPlayerIndex!];
  const trumpCard = game.trumpCard;

  return (
    <div>
      <div>
        <h1 className="durakHeader">Durak</h1>
        <div className="header">
          <div className="playerAndDeck">
            <strong>Players:</strong>{" "}
            {game.players.map((player) => player.name).join(", ")}
          </div>
          <div className="trumpCard">
            <strong>Trump Card:</strong>{" "}
            {trumpCard ? `${trumpCard.rank} of ${trumpCard.suit}` : "None"}
          </div>
          <div className="playerAndDeck">
            <strong>Remaining Cards:</strong> {game.remainingCardsCount()}
          </div>
        </div>
      </div>
      <div>
        <h2 className="attacker">
          Attacker: {game.players[game.currentAttackerIndex].name}
        </h2>
        <h2 className="defender">
          Defender: {game.players[game.currentDefenderIndex].name}
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "200px",
          }}
        >
          <div
            style={{
              backgroundColor: "yellow",
              padding: "20px",
              border:
                currentPlayerIndex === game.currentAttackerIndex ||
                currentPlayerIndex === game.currentDefenderIndex
                  ? "5px solid red"
                  : "5px solid green",
            }}
          >
            <h3>Your Hand</h3>
            <h2>Current Player: {game.players[currentPlayerIndex!].name}</h2>
            <div>
              {currentPlayer.hand.map((card, index) => (
                <div
                  key={index}
                  onClick={() => handleCardSelect(card)}
                  style={{
                    border:
                      selectedCard === card
                        ? "2px solid blue"
                        : "1px solid black",
                    padding: "10px",
                    cursor: "pointer",
                  }}
                >
                  {card.rank} of {card.suit}
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              height: "350px",
              width: "300px",
              backgroundColor: "orange",
              padding: "20px",
              marginRight: "200px",
            }}
          >
            <h3>Table</h3>
            <div>
              {game.table.map((play, index) => (
                <div key={index}>
                  Attack: {play.attack.rank} of {play.attack.suit}
                  {play.defense && (
                    <span>
                      {" "}
                      | Defense: {play.defense.rank} of {play.defense.suit}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{marginLeft: "200px"}}>
          <button onClick={handlePlaceCard} disabled={!selectedCard}>
            Place Card
          </button>
          {currentPlayerIndex === game.currentAttackerIndex && (
            <button onClick={handlePass}>Pass</button>
          )}
          {currentPlayerIndex === game.currentDefenderIndex && (
            <button onClick={handlePass}>Take Cards from Table</button>
          )}
        </div>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button onClick={handleNewGame} style={{marginLeft: "200px"}}>End Game and Start New Game</button>
    </div>
  );
};

export default GameBoard;
