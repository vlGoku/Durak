// src/components/StartPage.tsx

import React, { useState } from 'react';

interface StartPageProps {
  onStartGame: (playerNames: string[]) => void;
}

const MAX_PLAYERS = 4;

const StartPage: React.FC<StartPageProps> = ({ onStartGame }) => {
  const [playerNames, setPlayerNames] = useState<string[]>(['']);

  const handleAddPlayer = () => {
    if (playerNames.length < MAX_PLAYERS) {
      setPlayerNames([...playerNames, '']);
    }
  };

  const handleRemovePlayer = (index: number) => {
    setPlayerNames(playerNames.filter((_, i) => i !== index));
  };

  const handleChangeName = (index: number, name: string) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = name;
    setPlayerNames(newPlayerNames);
  };

  const handleStartGame = () => {
    onStartGame(playerNames.filter(name => name.trim() !== ''));
  };

  return (
    <div>
      <h1>Welcome to Durak</h1>
      <h2>Enter Player Names</h2>
      {playerNames.map((name, index) => (
        <div key={index}>
          <input
            type="text"
            value={name}
            onChange={(e) => handleChangeName(index, e.target.value)}
            placeholder={`Player ${index + 1}`}
          />
          <button onClick={() => handleRemovePlayer(index)}>Remove</button>
        </div>
      ))}
      {playerNames.length < MAX_PLAYERS && (
        <button onClick={handleAddPlayer}>Add Player</button>
      )}
      {playerNames.length === MAX_PLAYERS && (
        <p>Maximum number of players reached.</p>
      )}
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default StartPage;
