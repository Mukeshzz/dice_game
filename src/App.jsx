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
        <div className="min-h-screen bg-[#003161] flex flex-col items-center justify-center gap-6">
          <img src="dice.png" alt=""  className="drop-shadow-[0_5px_10px_rgba(0,0,0,0.7)] rounded-lg "/>
          <button
            className="bg-amber-50 text-3xl rounded p-4 cursor-pointer shadow-xl shadow-slate-900 "
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
