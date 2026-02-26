const express = require("express");
const cors = require("cors");
const { nanoid } = require("nanoid");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

/* Mock Database */
const sessions = new Map();

/* Helper */
function startsWithLetter(answer, letter) {
  return answer.trim().toLowerCase().startsWith(letter.toLowerCase());
}

/* ============================
   1) CREATE SESSION
============================ */
app.post("/word-grid/session", (req, res) => {
  const sessionId = nanoid(8);

  const session = {
    sessionId,
    difficulty: req.body.difficulty || "standard",
    nowPlaying: "green",
    status: "active",

    teams: {
      green: { name: "Green Team", score: 0, words: 0 },
      blue: { name: "Blue Team", score: 0, words: 0 }
    },

    cells: [
      { id: "A", letter: "H", claimedBy: "", status: "empty" },
      { id: "B", letter: "C", claimedBy: "", status: "empty" },
      { id: "C", letter: "J", claimedBy: "", status: "empty" }
    ]
  };

  sessions.set(sessionId, session);
  res.json(session);
});

/* ============================
   2) ANSWER
============================ */
app.post("/word-grid/answer", (req, res) => {
  const { sessionId, cellId, team, answer } = req.body;

  const session = sessions.get(sessionId);
  if (!session) return res.status(404).json({ error: "Session not found" });

  const cell = session.cells.find(c => c.id === cellId);
  if (!cell) return res.status(404).json({ error: "Cell not found" });

  const correct = startsWithLetter(answer, cell.letter);

  if (correct) {
    cell.status = "correct";
    cell.claimedBy = team;
    session.teams[team].score += 4;
    session.teams[team].words += 1;
  } else {
    cell.status = "wrong";
  }

  session.nowPlaying = team === "green" ? "blue" : "green";

  res.json({
    correct,
    nowPlaying: session.nowPlaying,
    cell
  });
});

/* ============================
   3) UPDATE SCORE
============================ */
app.patch("/word-grid/score", (req, res) => {
  const { sessionId, team, points } = req.body;

  const session = sessions.get(sessionId);
  if (!session) return res.status(404).json({ error: "Session not found" });

  session.teams[team].score += points;

  res.json({
    team,
    newScore: session.teams[team].score
  });
});

/* ============================
   4) FINISH GAME
============================ */
app.patch("/word-grid/finish", (req, res) => {
  const { sessionId } = req.body;

  const session = sessions.get(sessionId);
  if (!session) return res.status(404).json({ error: "Session not found" });

  session.status = "finished";

  const greenScore = session.teams.green.score;
  const blueScore = session.teams.blue.score;

  let winner = "draw";
  if (greenScore > blueScore) winner = "green";
  if (blueScore > greenScore) winner = "blue";

  session.winner = winner;

  res.json({
    winner,
    finalScores: session.teams
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});