import { useState } from "react";
import "../styles/gameScreen.css";

export default function GameScreen({ players = { player1: "Jugador 1", player2: "Jugador 2" } }) {
  const [incorrectGuesses, setIncorrectGuesses] = useState(0); 
  const maxAttempts = 6;

  const handleIncorrectGuess = () => {
    if (incorrectGuesses < maxAttempts) {
      setIncorrectGuesses(incorrectGuesses + 1);
    }
  };

  return (
    <div className="game-screen">
      <div className="player-section">
        <h2 className="player-title">{players.player1}</h2>
        <div className="player-box">
          <div className="hangman">
            <div className={`hangman-part ${incorrectGuesses >= 1 ? "show head" : ""}`}></div>
            <div className={`hangman-part ${incorrectGuesses >= 2 ? "show body" : ""}`}></div>
            <div className={`hangman-part ${incorrectGuesses >= 3 ? "show leftArm" : ""}`}></div>
            <div className={`hangman-part ${incorrectGuesses >= 4 ? "show rightArm" : ""}`}></div>
            <div className={`hangman-part ${incorrectGuesses >= 5 ? "show leftLeg" : ""}`}></div>
            <div className={`hangman-part ${incorrectGuesses >= 6 ? "show rightLeg" : ""}`}></div>
          </div>
        </div>
      </div>

      <div className="player-section">
        <h2 className="player-title">{players.player2}</h2>
        <div className="player-box">
          <div className="hangman">
            <div className={`hangman-part ${incorrectGuesses >= 1 ? "show head" : ""}`}></div>
            <div className={`hangman-part ${incorrectGuesses >= 2 ? "show body" : ""}`}></div>
            <div className={`hangman-part ${incorrectGuesses >= 3 ? "show leftArm" : ""}`}></div>
            <div className={`hangman-part ${incorrectGuesses >= 4 ? "show rightArm" : ""}`}></div>
            <div className={`hangman-part ${incorrectGuesses >= 5 ? "show leftLeg" : ""}`}></div>
            <div className={`hangman-part ${incorrectGuesses >= 6 ? "show rightLeg" : ""}`}></div>
          </div>
        </div>
      </div>

      <button onClick={handleIncorrectGuess}>Simular intento fallido</button>
    </div>
  );
}
