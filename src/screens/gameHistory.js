import React from "react";
import "../styles/gameHistory.css";

export default function GameHistory({ history = [] }) {
  return (
    <div className="history-screen">
      <div className="container">
        <h1 className="title">Historial de Partidas</h1>
        <p className="subtitle">Revisa los resultados de partidas anteriores</p>
        <div className="history-list">
          {history.length > 0 ? (
            history.map((game, index) => (
              <div key={index} className="history-item">
                <p><strong>{game.date}</strong></p>
                <p>{game.player1} vs {game.player2}</p>
                <p><strong>Ganador:</strong> {game.winner}</p>
              </div>
            ))
          ) : (
            <p className="subtitle">No hay partidas registradas.</p>
          )}
        </div>
      </div>
    </div>
  );
}
