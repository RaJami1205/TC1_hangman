import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import wordsData from "../data/words.json";
import "../styles/gameScreen.css";

export default function GameScreen({ players = { player1: "Jugador 1", player2: "Jugador 2" } }) {
  const navigate = useNavigate();
  const [word1, setWord1] = useState(""); 
  const [word2, setWord2] = useState(""); 
  const [guessedLetters1, setGuessedLetters1] = useState([]); 
  const [guessedLetters2, setGuessedLetters2] = useState([]); 
  const [incorrectGuesses1, setIncorrectGuesses1] = useState(0); 
  const [incorrectGuesses2, setIncorrectGuesses2] = useState(0); 
  const [round, setRound] = useState(0); 
  const [player1Wins, setPlayer1Wins] = useState(0); 
  const [player2Wins, setPlayer2Wins] = useState(0); 
  const [gameOver, setGameOver] = useState(false); 
  const [timeElapsed, setTimeElapsed] = useState(0); 
  const maxAttempts = 6;

  const handleStart = () => {
    navigate("/"); 
  };

  useEffect(() => {
    if (wordsData.length > 0) {
      const randomWord1 = wordsData[Math.floor(Math.random() * wordsData.length)];
      const randomWord2 = wordsData[Math.floor(Math.random() * wordsData.length)];
      setWord1(randomWord1);
      setWord2(randomWord2);
    } else {
      console.error("El archivo words.json está vacío o no se está importando correctamente.");
    }
  }, [round]);  

  useEffect(() => {
    let timer;
    if (!gameOver) {
      timer = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1); 
      }, 1000);
    }

    return () => {
      clearInterval(timer); 
    };
  }, [gameOver]);

  useEffect(() => {
    if (!gameOver) {
      checkRoundWinner(); 
    }
  }, [guessedLetters1, guessedLetters2, incorrectGuesses1, incorrectGuesses2]);
  
  useEffect(() => {
    if (gameOver) {
      guardarPartida(); 
    }
  }, [gameOver]); 

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`; 
  };

  const handleLetterClick = (letter, player) => {
    if (gameOver) return;

    if (player === 1) {
      if (word1.includes(letter)) {
        setGuessedLetters1([...guessedLetters1, letter]);
      } else {
        setIncorrectGuesses1(incorrectGuesses1 + 1);
      }
    } else {
      if (word2.includes(letter)) {
        setGuessedLetters2([...guessedLetters2, letter]);
      } else {
        setIncorrectGuesses2(incorrectGuesses2 + 1);
      }
    }
  };

  const checkRoundWinner = () => {
    if (round === 3) {
      setGameOver(true);
    }

    if (guessedLetters1.length === word1.length) {
      setPlayer1Wins(player1Wins + 1);
    }

    if (guessedLetters2.length === word2.length) {
      setPlayer2Wins(player2Wins + 1);
    }

    if (
      (guessedLetters1.length === word1.length || incorrectGuesses1 >= maxAttempts) &&
      (guessedLetters2.length === word2.length || incorrectGuesses2 >= maxAttempts)
    ) {
      setRound(round + 1);
      setGuessedLetters1([]);
      setGuessedLetters2([]);
      setIncorrectGuesses1(0);
      setIncorrectGuesses2(0);
    }
  };

  const getGameResult = () => {
    if (player1Wins > player2Wins) {
      return <h2>{players.player1} ha ganado el juego!</h2>;
    } else if (player2Wins > player1Wins) {
      return <h2>{players.player2} ha ganado el juego!</h2>;
    } else {
      return <h2>¡Empate!</h2>;
    }
  };

  const guardarPartida = () => {
    const resultado =
      player1Wins > player2Wins
        ? `${players.player1} ganó`
        : player2Wins > player1Wins
        ? `${players.player2} ganó`
        : "Empate";
  
    const partida = {
      player1: players.player1,
      player2: players.player2,
      resultado,
      tiempo: timeElapsed
    };
  
    // Obtener historial previo o crear uno nuevo
    const historial = JSON.parse(localStorage.getItem("historial")) || [];
    historial.push(partida);
  
    // Guardar historial actualizado en localStorage
    localStorage.setItem("historial", JSON.stringify(historial));
  };

  return (
    <div className="game-screen">
      {gameOver ? (
        <div className="game-result">
          {getGameResult()}
          <button onClick={handleStart} className="start-button">
            Volver al Inicio
          </button>
        </div>
      ) : (
        <>
          <div className="round-display">
            <h2>Ronda {round}</h2>
          </div>
          <div className="time-display">
            <h2>Tiempo: {formatTime(timeElapsed)}</h2>
          </div>
          <div className="player-section">
            <h2 className="player-title">{players.player1}</h2>
            <div className="player-box">
              <div className="hangman">
                <div className={`hangman-part ${incorrectGuesses1 >= 1 ? "show head" : ""}`}></div>
                <div className={`hangman-part ${incorrectGuesses1 >= 2 ? "show body" : ""}`}></div>
                <div className={`hangman-part ${incorrectGuesses1 >= 3 ? "show leftArm" : ""}`}></div>
                <div className={`hangman-part ${incorrectGuesses1 >= 4 ? "show rightArm" : ""}`}></div>
                <div className={`hangman-part ${incorrectGuesses1 >= 5 ? "show leftLeg" : ""}`}></div>
                <div className={`hangman-part ${incorrectGuesses1 >= 6 ? "show rightLeg" : ""}`}></div>
              </div>
              <div className="word-and-buttons">
                <h2>
                  Palabra: {word1.split("").map((letter) => (guessedLetters1.includes(letter) ? letter : "_")).join(" ")}
                </h2>
                <div>
                  {"abcdefghijklmnñopqrstuvwxyz".split("").map((letter) => (
                    <button
                      key={letter}
                      onClick={() => handleLetterClick(letter, 1)}
                      disabled={guessedLetters1.includes(letter) || incorrectGuesses1 >= maxAttempts || guessedLetters1.length === word1.length}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="player-section">
            <h2 className="player-title">{players.player2}</h2>
            <div className="player-box">
              <div className="hangman">
                <div className={`hangman-part ${incorrectGuesses2 >= 1 ? "show head" : ""}`}></div>
                <div className={`hangman-part ${incorrectGuesses2 >= 2 ? "show body" : ""}`}></div>
                <div className={`hangman-part ${incorrectGuesses2 >= 3 ? "show leftArm" : ""}`}></div>
                <div className={`hangman-part ${incorrectGuesses2 >= 4 ? "show rightArm" : ""}`}></div>
                <div className={`hangman-part ${incorrectGuesses2 >= 5 ? "show leftLeg" : ""}`}></div>
                <div className={`hangman-part ${incorrectGuesses2 >= 6 ? "show rightLeg" : ""}`}></div>
              </div>
              <div className="word-and-buttons">
                <h2>
                  Palabra: {word2.split("").map((letter) => (guessedLetters2.includes(letter) ? letter : "_")).join(" ")}
                </h2>
                <div>
                  {"abcdefghijklmnñopqrstuvwxyz".split("").map((letter) => (
                    <button
                      key={letter}
                      onClick={() => handleLetterClick(letter, 2)}
                      disabled={guessedLetters2.includes(letter) || incorrectGuesses2 >= maxAttempts || guessedLetters2.length === word2.length}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
