import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import StartScreen from "./screens/startScreen";
import GameScreen from "./screens/gameScreen";

function App() {
  const [players, setPlayers] = useState({ player1: "", player2: "" });

  return (
    <Router>
      <Routes>
        {/* Pantalla de inicio */}
        <Route path="/" element={<StartScreen setPlayers={setPlayers} />} />

        {/* Pantalla del juego */}
        <Route path="/game" element={<GameScreen players={players} />} />
      </Routes>
    </Router>
  );
}

export default App;
