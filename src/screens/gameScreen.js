import { useState, useEffect } from "react";
import wordsData from "../data/words.json";
import "../styles/gameScreen.css";

export default function GameScreen({ players = { player1: "Jugador 1", player2: "Jugador 2" } }) {
  const [word, setWord] = useState(""); 
  const [guessedLetters, setGuessedLetters] = useState([]); 
  const [incorrectGuesses, setIncorrectGuesses] = useState(0); 
  const maxAttempts = 6;

  useEffect(() => {
    if (wordsData.length > 0) {
      const randomWord = wordsData[Math.floor(Math.random() * wordsData.length)];
      setWord(randomWord);
    } else {
      console.error("El archivo words.json está vacío o no se está importando correctamente.");
    }
  }, []);

  const handleLetterClick = (letter) => {
    if (word.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    } else {
      setIncorrectGuesses(incorrectGuesses + 1);
    }
  };

  return (
    <div className="game-screen">
      <div className="player-section">
        <h2 className="player-title">{players.player1}</h2>
        <div className="player-box">
          {/* Muñeco de ahorcado */}
          <div className="hangman">
            <div className={`hangman-part ${incorrectGuesses >= 1 ? "show head" : ""}`}></div>
            <div className={`hangman-part ${incorrectGuesses >= 2 ? "show body" : ""}`}></div>
            <div className={`hangman-part ${incorrectGuesses >= 3 ? "show leftArm" : ""}`}></div>
            <div className={`hangman-part ${incorrectGuesses >= 4 ? "show rightArm" : ""}`}></div>
            <div className={`hangman-part ${incorrectGuesses >= 5 ? "show leftLeg" : ""}`}></div>
            <div className={`hangman-part ${incorrectGuesses >= 6 ? "show rightLeg" : ""}`}></div>
          </div>

          {/* Palabra y botones */}
          <div className="word-and-buttons">
            <h2>
              Palabra: {word.split("").map((letter) => (guessedLetters.includes(letter) ? letter : "_")).join(" ")}
            </h2>
            <div>
              {"abcdefghijklmnñopqrstuvwxyz".split("").map((letter) => (
                <button
                  key={letter}
                  onClick={() => handleLetterClick(letter)}
                  disabled={guessedLetters.includes(letter)}
                >
                  {letter}
                </button>
              ))}
            </div>
            <p>Intentos incorrectos: {incorrectGuesses}/{maxAttempts}</p>
          </div>
        </div>
      </div>

      <div className="player-section">
        <h2 className="player-title">{players.player2}</h2>
        <div className="player-box">
          {/* Muñeco de ahorcado */}
          <div className="hangman">
            <div className={`hangman-part ${incorrectGuesses >= 1 ? "show head" : ""}`}></div>
            <div className={`hangman-part ${incorrectGuesses >= 2 ? "show body" : ""}`}></div>
            <div className={`hangman-part ${incorrectGuesses >= 3 ? "show leftArm" : ""}`}></div>
            <div className={`hangman-part ${incorrectGuesses >= 4 ? "show rightArm" : ""}`}></div>
            <div className={`hangman-part ${incorrectGuesses >= 5 ? "show leftLeg" : ""}`}></div>
            <div className={`hangman-part ${incorrectGuesses >= 6 ? "show rightLeg" : ""}`}></div>
          </div>

          {/* Palabra y botones */}
          <div className="word-and-buttons">
            <h2>
              Palabra: {word.split("").map((letter) => (guessedLetters.includes(letter) ? letter : "_")).join(" ")}
            </h2>
            <div>
              {"abcdefghijklmnñopqrstuvwxyz".split("").map((letter) => (
                <button
                  key={letter}
                  onClick={() => handleLetterClick(letter)}
                  disabled={guessedLetters.includes(letter)}
                >
                  {letter}
                </button>
              ))}
            </div>
            <p>Intentos incorrectos: {incorrectGuesses}/{maxAttempts}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
