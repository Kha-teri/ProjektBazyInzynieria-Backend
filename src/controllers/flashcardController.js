import * as flashcardService from "../services/flashcardService.js";

export const createNewSet = async (req, res) => {
  try {
    const set = await flashcardService.createSet(
      req.user.userId,
      req.body.name,
    );
    res.status(201).json(set);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserSets = async (req, res) => {
  try {
    const sets = await flashcardService.getSets(req.user.userId);
    res.json(sets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSingleSet = async (req, res) => {
  try {
    const { setId } = req.params;
    const userId = req.user.userId;

    const set = await flashcardService.getSetWithCards(userId, setId);
    res.json(set);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

export const addCard = async (req, res) => {
  try {
    const { setId } = req.params;
    const card = await flashcardService.addFlashcard(
      req.user.userId,
      setId,
      req.body,
    );
    res.status(201).json(card);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

export const markAsLearned = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await flashcardService.toggleLearned(req.user.userId, id);
    res.json(updated);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
