import '../styles/gameScreen.css';

export default function GameScreen({ players = { player1: "Jugador 1", player2: "Jugador 2" } }) {
  return (
    <div className="game-screen">
      {/* Sección Jugador 1 */}
      <div className="player-section">
        <h2 className="player-title">{players.player1}</h2>
        <div className="player-box">
        </div>
      </div>

      {/* Sección Jugador 2 */}
      <div className="player-section">
        <h2 className="player-title">{players.player2}</h2>
        <div className="player-box">
        </div>
      </div>
    </div>
  );
}
