import express from "express";
import cors from "cors";
import { createHash, randomBytes } from "crypto";

const app = express();

app.use(
  cors({
    origin: "*",
    withCredentials: true,
  })
);
app.use(express.json());

let balance = 1000;

app.post("/roll-dice", (req, res) => {
  const { bet } = req.body;

  if (bet > balance || bet <= 0) {
    return res.status(400).json({ message: "Invalid bet amount!" });
  }
  console.log("Bet:", bet)

  //Generate random roll (1-6)
  const roll = Math.floor(Math.random() * 6) + 1;
  console.log(roll)

  //Generate a hash
  const secret = randomBytes(16).toString("hex");
  const hash = createHash("sha256")
    .update(secret + roll)
    .digest("hex");

  //Game Logic
  if (roll >= 4) {
    balance = balance + bet; //Win
  } else {
    balance = balance - bet; //Lose
  }
  console.log("Balance:",balance)
  return res.json({ dice: roll, newBalance: balance, hash });
});

app.post("/end-game",(req,res) =>{
  balance = 1000;
  return res.json({message:"Game ended!"})
});



app.listen(3000, () => {
  console.log(`Server is running on port : 3000`);
});
