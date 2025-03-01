import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/startScreen.css';

export default function StartScreen({ setPlayers }) {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (player1 && player2) {
      setPlayers({ player1, player2 }); 
      navigate("/game"); 
    } else {
      alert("Por favor, ingresa los nombres de ambos jugadores");
    }
  };

  const handleHistory = () => {
    navigate("/history");
  };

  return (
    <div className="start-screen">
      <div className="container">
        <h1 className="title">Juego del Ahorcado</h1>
        <p className="subtitle">Ingresa los nombres de los jugadores para comenzar</p>
        <input
          type="text"
          placeholder="Nombre del Jugador"
          className="input"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nombre del Jugador"
          className="input"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
        />
        <button onClick={handleStart} className="start-button">
          Comenzar Juego
        </button>
        <button onClick={handleHistory} className="start-button">
          Ver Historial
        </button>
      </div>
    </div>
  );
}
