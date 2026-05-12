import prisma from "../config/db.js";

export const createMaterial = async (userId, materialData) => {
  const { title, type, content, subject_id } = materialData;

  const subject = await prisma.subject.findFirst({
    where: { id: Number(subject_id), user_id: userId },
  });

  if (!subject) throw new Error("Cannot add material to non-existing subject");

  return await prisma.material.create({
    data: {
      title,
      type,
      content,
      user_id: userId,
      subject_id: subject_id ? Number(subject_id) : null,
    },
  });
};

export const fetchMaterials = async (userId) => {
  return await prisma.material.findMany({
    where: { user_id: userId },
    include: { subject: { select: { name: true } } },
  });
};

export const getMaterialsBySubject = async (userId, subjectId) => {
  const subject = await prisma.subject.findFirst({
    where: { id: Number(subjectId), user_id: userId },
  });

  if (!subject) throw new Error("Cannot access materials to this subject");

  return await prisma.material.findMany({
    where: { subject_id: Number(subjectId) },
    include: { subject: { select: { name: true } } },
  });
};

export const deleteMaterial = async (userId, materialId) => {
  const material = await prisma.material.findFirst({
    where: {
      id: Number(materialId),
      subject: { user_id: userId },
    },
  });

  if (!material) throw new Error("Material not found. Cannot delete");

  return await prisma.material.delete({
    where: { id: Number(materialId) },
  });
};

export const updateMaterial = async (materalId, userId, updateData) => {
  const material = await prisma.material.findFirst({
    where: { id: Number(materalId), user_id: userId },
  });

  if (!material) throw new Error("Cannot update the material");
  console.log(updateData.subject_id);

  return await prisma.material.update({
    where: { id: Number(materalId) },
    data: {
      title: updateData.title,
      type: updateData.type,
      content: updateData.content,
      subject_id:
        updateData.subject_id !== undefined
          ? updateData.subject_id
            ? Number(updateData.subject_id)
            : null
          : undefined,
    },
  });
};
