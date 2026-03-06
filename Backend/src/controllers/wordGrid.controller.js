const service = require("../services/wordGrid.service");

exports.createSession = async (req, res) => {
  try {
    const session = await service.createSession(
      req.body.difficulty || "standard",
      req.body.greenName,
      req.body.blueName,
      30
    );
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.submitAnswer = async (req, res) => {
  try {
    const { sessionId, cellId, team, answer } = req.body;
    const result = await service.submitAnswer(
      sessionId,
      cellId,
      team,
      answer
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};