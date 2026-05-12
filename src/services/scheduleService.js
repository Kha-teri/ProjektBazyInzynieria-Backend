import prisma from "../config/db.js";

export const createScheduleEntry = async (userId, data) => {
  const { date, start_time, end_time, subject_id } = data;

  return await prisma.classSchedule.create({
    data: {
      date: new Date(date),
      start_time: new Date(`${date}T${start_time}`),
      end_time: new Date(`${date}T${end_time}`),
      user_id: userId,
      subject_id: subject_id ? Number(subject_id) : null,
    },
  });
};

export const getSchedule = async (userId) => {
  return await prisma.classSchedule.findMany({
    where: { user_id: userId },
    include: {
      subject: { select: { name: true, color_code: true } },
    },
    orderBy: [{ date: "asc" }, { start_time: "asc" }],
  });
};

export const updateScheduleEntry = async (id, userId, updateData) => {
  const entry = await prisma.classSchedule.findFirst({
    where: { id: Number(id), user_id: userId },
  });

  if (!entry) throw new Error("schedule has not been found");

  const date = updateData.date || entry.date.toISOString().split("T")[0];

  return await prisma.classSchedule.update({
    where: { id: Number(id) },
    data: {
      date: updateData.date ? new Date(updateData.date) : undefined,
      start_time: updateData.start_time
        ? new Date(`${date}T${updateData.start_time}`)
        : undefined,
      end_time: updateData.end_time
        ? new Date(`${date}T${updateData.end_time}`)
        : undefined,
      subject_id: updateData.subject_id
        ? Number(updateData.subject_id)
        : undefined,
    },
  });
};

export const deleteScheduleEntry = async (id, userId) => {
  const entry = await prisma.classSchedule.findFirst({
    where: { id: Number(id), user_id: userId },
  });

  if (!entry) throw new Error("Schedule for deletion has not been found");

  return await prisma.classSchedule.delete({
    where: { id: Number(id) },
  });
};
