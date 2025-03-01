import "./App.css";

import React, { useState } from "react";
import Startgame from "./components/Startgame";

const App = () => {
  const [start, setStart] = useState(false);

  const startGame = () => {
    setStart(true);
  };

  return (
    <>
      {start ? (
        <Startgame setStart={setStart}/>
      ) : (
        <div className="min-h-screen bg-[#003161] flex items-center justify-center gap-6">
          <img src="dice.png" alt="" />
          <button
            className="bg-amber-50 text-3xl rounded p-4 cursor-pointer"
            onClick={startGame}
          >
            Start Game
          </button>
        </div>
      )}
    </>
  );
};

export default App;
