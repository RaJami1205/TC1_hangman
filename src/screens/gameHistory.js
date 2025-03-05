import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/gameHistory.css"; // Importar estilos

export default function Historial() {
  const [historial, setHistorial] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const partidasGuardadas = JSON.parse(localStorage.getItem("historial")) || [];
    setHistorial(partidasGuardadas);
  }, []);

  const borrarHistorial = () => {
    localStorage.removeItem("historial");
    setHistorial([]);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="historial-screen">
      <div className="historial-container">
        <h2 className="historial-title">Historial de Partidas</h2>

        {historial.length === 0 ? (
          <p className="historial-empty">No hay partidas guardadas.</p>
        ) : (
          <div className="historial-list">
            {historial.map((partida, index) => (
              <div key={index} className="historial-item">
                <strong>{partida.player1}</strong> vs <strong>{partida.player2}</strong>
                <br />
                <span>Resultado: {partida.resultado}</span>
                <br />
                <span>Tiempo transcurrido: {formatTime(partida.tiempo)}</span>
              </div>
            ))}
          </div>
        )}

        <div className="historial-buttons">
          <button className="historial-button" onClick={borrarHistorial}>
            Borrar Historial
          </button>
          <button className="historial-button" onClick={() => navigate("/")}>
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}
