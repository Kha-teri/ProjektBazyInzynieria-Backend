import prisma from "../config/db.js";

export const createTask = async (userId, taskData) => {
  const { title, description, due_date, subject_id } = taskData;

  return await prisma.task.create({
    data: {
      title,
      description,
      due_date: due_date ? new Date(due_date) : null,
      status: "todo",
      user_id: userId,
      subject_id: Number(subject_id),
    },
  });
};

export const getTasks = async (userId) => {
  return await prisma.task.findMany({
    where: { user_id: userId },
    include: {
      subject: {
        select: { name: true, color_code: true },
      },
    },
    orderBy: { due_date: "asc" },
  });
};

export const updateTaskStatus = async (taskId, userId, newStatus) => {
  const task = await prisma.task.findFirst({
    where: { id: Number(taskId), user_id: userId },
  });

  if (!task) throw new Error("Task not found");

  const isAlreadyDone = task.status === "done";

  const updatedTask = await prisma.task.update({
    where: { id: Number(taskId) },
    data: { status: newStatus },
  });

  if (newStatus === "done" && !isAlreadyDone) {
    const pointsToAdd = 20;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    const newTotalPoints = user.total_points + pointsToAdd;
    const newLevel = Math.floor(newTotalPoints / 100) + 1;

    await prisma.user.update({
      where: { id: userId },
      data: {
        total_points: newTotalPoints,
        level: newLevel,
      },
    });
  }

  return updatedTask;
};

export const deleteTask = async (taskId, userId) => {
  const task = await prisma.task.findFirst({
    where: {
      id: Number(taskId),
      user_id: userId,
    },
  });

  if (!task) {
    throw new Error("Task not found or no privileges");
  }

  return await prisma.task.delete({
    where: { id: Number(taskId) },
  });
};
