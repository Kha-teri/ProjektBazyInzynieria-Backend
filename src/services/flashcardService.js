import prisma from "../config/db.js";

export const createSet = async (userId, name) => {
  return await prisma.flashcardSet.create({
    data: { name, user_id: userId },
  });
};

export const getSets = async (userId) => {
  return await prisma.flashcardSet.findMany({
    where: { user_id: userId },
    include: {
      _count: { select: { flashcards: true } },
    },
  });
};

export const getSetWithCards = async (userId, setId) => {
  const set = await prisma.flashcardSet.findUnique({
    where: { id: Number(setId) },
    include: {
      flashcards: {
        orderBy: { id: "asc" },
      },
    },
  });

  if (!set || set.user_id !== userId) {
    throw new Error("Flashcard set does not exist or user cannot access it");
  }

  return set;
};

export const addFlashcard = async (userId, setId, cardData) => {
  const set = await prisma.flashcardSet.findFirst({
    where: { id: Number(setId), user_id: userId },
  });

  if (!set) throw new Error("Set has not been found or user cannot modify it");

  return await prisma.flashcard.create({
    data: {
      word: cardData.word,
      translation: cardData.translation,
      set_id: Number(setId),
    },
  });
};

export const toggleLearned = async (userId, cardId) => {
  const card = await prisma.flashcard.findFirst({
    where: {
      id: Number(cardId),
      flashcard_set: { user_id: userId },
    },
  });

  if (!card) throw new Error("Flashcard does not exist");

  return await prisma.flashcard.update({
    where: { id: Number(cardId) },
    data: { is_learned: !card.is_learned },
  });
};
