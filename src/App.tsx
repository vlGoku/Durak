// src/App.tsx

import React, { useState } from 'react';
import StartPage from './components/StartPage';
import GameBoard from './components/GameBoard';

const App: React.FC = () => {
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const handleStartGame = (names: string[]) => {
    setPlayerNames(names);
    setGameStarted(true);
  };

  return (
    <div className="App">
      {gameStarted ? (
        <GameBoard playerNames={playerNames} />
      ) : (
        <StartPage onStartGame={handleStartGame} />
      )}
    </div>
  );
};

export default App;
