import * as sessionService from "../services/studySessionService.js";

export const start = async (req, res) => {
  try {
    const session = await sessionService.startSession(req.user.userId);
    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const stop = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sessionService.stopSession(req.user.userId, id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const sessions = await sessionService.getUserSessions(req.user.userId);
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
