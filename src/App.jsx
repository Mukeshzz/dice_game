import { useState } from "react";
import axios from "axios";
import './App.css';

export default function App() {
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
      const res = await axios.post("http://localhost:3000/roll-dice", { bet });
      const { dice, newBalance, hash } = res.data;

      setRoll(dice);
      setBalance(newBalance);
      setHash(hash);
    } catch (err) {
      console.error("Error rolling dice:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">🎲 Provably Fair Dice Game 🎲</h1>

      <p className="mt-4 text-lg">Balance: ${balance}</p>

      <input
        type="number"
        value={bet}
        onChange={(e) => setBet(Number(e.target.value))}
        className="mt-3 p-2 text-black rounded"
        min="1"
        max={balance}
      />

      <button
        onClick={rollDice}
        className="mt-3 bg-blue-500 px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Roll Dice
      </button>

      {roll !== null && (
        <div className="mt-5">
          <p className="text-xl">You rolled: <strong>{roll}</strong></p>
          <p className="text-sm mt-2 break-all">Hash: {hash}</p>
        </div>
      )}
    </div>
  );
}
