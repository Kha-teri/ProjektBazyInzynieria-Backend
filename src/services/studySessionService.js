import prisma from "../config/db.js";

export const startSession = async (userId) => {
  const activeSession = await prisma.studySession.findFirst({
    where: { user_id: userId, end_time: null },
  });

  if (activeSession)
    throw new Error("User have already an active study session");

  return await prisma.studySession.create({
    data: {
      user_id: userId,
      start_time: new Date(),
    },
  });
};

export const stopSession = async (userId, sessionId) => {
  const session = await prisma.studySession.findUnique({
    where: { id: Number(sessionId) },
  });

  if (!session || session.user_id !== userId)
    throw new Error("Session does not exist or current user cannot access it");
  if (session.end_time) throw new Error("Session has already ended");

  const endTime = new Date();
  const durationInMinutes = Math.floor(
    (endTime - new Date(session.start_time)) / 60000,
  );

  const xpEarned = durationInMinutes * 2;

  const updatedSession = await prisma.studySession.update({
    where: { id: Number(sessionId) },
    data: {
      reward_points: xpEarned,
      end_time: endTime,
    },
  });

  if (xpEarned > 0) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const newTotalPoints = user.total_points + xpEarned;
    const newLevel = Math.floor(newTotalPoints / 100) + 1;

    await prisma.user.update({
      where: { id: userId },
      data: {
        total_points: newTotalPoints,
        level: newLevel,
      },
    });
  }

  return { updatedSession, xpEarned, durationInMinutes };
};

export const getUserSessions = async (userId) => {
  return await prisma.studySession.findMany({
    where: { user_id: userId },
    orderBy: { start_time: "desc" },
  });
};
