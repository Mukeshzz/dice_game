import { useState } from "react";
import axios from "axios";

export default function Startgame({setStart}) {
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(10);
  const [roll, setRoll] = useState(null);
  const [hash, setHash] = useState("");
  

 

  const rollDice = async () => {
    if (bet > balance || bet <= 0) {
      alert("Invalid bet amount!");
      return;
    }

    try {
      const res = await axios.post("https://dice-game-pi48.onrender.com/roll-dice", { bet });
      const { dice, newBalance, hash } = res.data;

      setRoll(dice);
      setBalance(newBalance);
      setHash(hash);
    } catch (err) {
      console.error("Error rolling dice:", err);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#003161] gap-2 ">
        <h1 className="text-5xl font-bold text-[#FFF4B7]">🎲 Dice Game 🎲</h1>

        <p className="mt-4  text-lg text-white">Balance: ${balance}</p>

        <input
          type="number"
          value={bet}
          onChange={(e) => setBet(Number(e.target.value))}
          className="mt-3 p-2 rounded border border-white text-white"
          min="1"
          max={balance}
        />

        <button
          onClick={rollDice}
          className="mt-3 bg-amber-50 text-3xl rounded p-4 cursor-pointer transition"
        >
          Roll Dice
        </button>

        {roll !== null && (
          <div className="mt-5  flex justify-center flex-col gap-5 items-center">
            <p className="text-2xl text-white">
              You rolled: <strong>{roll}</strong>
            </p>
            <p className="text-xl mt-2 break-all text-white">Hash: {hash}</p>
            <button className="bg-amber-50 text-2xl rounded p-3 cursor-pointer" onClick={ () => setStart(false)}>
              End Game
            </button>
          </div>
        )}
      </div>
    </>
  );
}
