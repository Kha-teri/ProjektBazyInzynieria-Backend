import prisma from "../config/db.js";
import bcrypt from "bcrypt";

export const registerUser = async (
  email,
  password,
  nickname,
  controlQuestion,
  answer,
) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return await prisma.user.create({
    data: {
      email: email,
      password_hash: hashedPassword,
      nickname: nickname,
      control_question: controlQuestion,
      answer: answer,
      total_points: 0,
      level: 1,
    },
  });
};

export const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const getUserProfile = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      total_points: true,
      level: true,
      study_sessions: {
        where: { end_time: null },
        take: 1,
      },
      _count: {
        select: {
          subjects: true,
          tasks: { where: { status: "todo" } },
        },
      },
    },
  });
};
