import prisma from "../config/db.js";

export const createSubject = async (userId, name, color, lecturer) => {
  return await prisma.subject.create({
    data: {
      name,
      color_code: color,
      lecturer_name: lecturer,
      user_id: userId,
    },
  });
};

export const getUserSubjects = async (userId) => {
  return await prisma.subject.findMany({
    where: { user_id: userId },
  });
};

export const deleteSubject = async (userId, subjectId) => {
  const subject = await prisma.subject.findFirst({
    where: {
      id: Number(subjectId),
      user_id: userId,
    },
  });

  if (!subject) {
    throw new Error("Subject not found or no privileges");
  }

  return await prisma.subject.delete({
    where: { id: Number(subjectId) },
  });
};

export const updateSubject = async (subjectId, userId, updateData) => {
  const subject = await prisma.subject.findFirst({
    where: { id: Number(subjectId), user_id: userId },
  });

  if (!subject) {
    throw new Error("Subject not found or no privileges");
  }

  return await prisma.subject.update({
    where: { id: Number(subjectId) },
    data: updateData,
  });
};
