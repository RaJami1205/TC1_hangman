import '../styles/gameScreen.css';

export default function GameScreen({ players }) {
  return (
    <div className="game-screen">
      <div className="container">
        <h1 className="title">Interfaz del Juego Principal</h1>
        <p className="subtitle">Jugador 1: {players.player1}</p>
        <p className="subtitle">Jugador 2: {players.player2}</p>
      </div>
    </div>
  );
}
