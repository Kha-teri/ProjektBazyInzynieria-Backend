import * as materialService from "../services/materialService.js";

export const addMaterial = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, type, content } = req.body;

    if (!title || !type) {
      return res.status(400).json({ error: "Title and type are required" });
    }

    const material = await materialService.createMaterial(userId, req.body);
    res.status(201).json(material);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

export const getMaterials = async (req, res) => {
  try {
    const userId = req.user.userId;
    const materials = await materialService.fetchMaterials(userId);
    res.json(materials);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const getSubjectMaterials = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { subjectId } = req.params;
    const materials = await materialService.getMaterialsBySubject(
      userId,
      subjectId,
    );
    res.json(materials);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

export const removeMaterial = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    await materialService.deleteMaterial(userId, id);
    res.json({ message: "Material deleted" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const editMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const updated = await materialService.updateMaterial(id, userId, req.body);
    res.json({ message: "Material updated", updated });
  } catch (error) {
    res.json({ error: error.message });
  }
};
