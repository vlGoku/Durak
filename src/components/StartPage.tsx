// src/components/StartPage.tsx

import React, { useState } from "react";

interface StartPageProps {
  onStartGame: (playerNames: string[]) => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStartGame }) => {
  const [playerNames, setPlayerNames] = useState<string[]>(["", ""]); // Start mit zwei leeren Spielernamen
  const [nameErrors, setNameErrors] = useState<boolean[]>([false, false]);
  const [showNameError, setShowNameError] = useState(false);

  const handleAddPlayer = () => {
    if (playerNames.length < 4) {
      setPlayerNames([...playerNames, ""]);
      setNameErrors([...nameErrors, false]);
    }
  };

  const handleRemovePlayer = (index: number) => {
    if (playerNames.length > 2) {
      setPlayerNames(playerNames.filter((_, i) => i !== index));
      setNameErrors(nameErrors.filter((_, i) => i !== index));
    }
  };

  const handleChangeName = (index: number, name: string) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = name;
    setPlayerNames(newPlayerNames);

    const newErrors = [...nameErrors];
    newErrors[index] = name.trim() === "";
    setNameErrors(newErrors);

    setShowNameError(false); // Verstecke die Fehlermeldung bei jeder Änderung
  };

  const handleStartGame = () => {
    const trimmedPlayerNames = playerNames.map((name) => name.trim());
    const validNames = trimmedPlayerNames.filter((name) => name !== "");

    if (validNames.length >= 2 && validNames.length <= 4) {
      onStartGame(validNames);
    } else {
      setShowNameError(true); // Zeige die Fehlermeldung, wenn nicht alle Namen eingegeben wurden
    }
  };

  return (
    <div>
      <h1>Welcome to Durak</h1>
      <h2>Enter Player Names (2 to 4 players)</h2>
      {playerNames.map((name, index) => (
        <div className="startPage" key={index}>
          <input
            type="text"
            value={name}
            onChange={(e) => handleChangeName(index, e.target.value)}
            placeholder={`Player ${index + 1}`}
            style={{ borderColor: nameErrors[index] ? "red" : undefined }}
          />
          <button
            onClick={() => handleRemovePlayer(index)}
            disabled={playerNames.length === 2}
          >
            Remove
          </button>
        </div>
      ))}
      <div className="startPageButtons">
        {playerNames.length < 4 && (
          <button onClick={handleAddPlayer}>Add Player</button>
        )}
        {playerNames.length === 4 && (
          <p>Maximum number of players reached.</p>
        )}
        <button onClick={handleStartGame}>Start Game</button>
      </div>
      <div style={{ textAlign: "center"}}>
      {showNameError && playerNames.some((name) => name.trim() === "") && (
        <p style={{ color: "red" }}>Please enter a name for each player.</p>
      )}
      </div>
    </div>
  );
};

export default StartPage;
