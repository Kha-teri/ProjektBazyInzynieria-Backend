import * as subjectService from "../services/subjectService.js";

export const addSubject = async (req, res) => {
  try {
    const { name, color_code, lecturer_name } = req.body;
    const userId = req.user.userId;

    const subject = await subjectService.createSubject(
      userId,
      name,
      color_code,
      lecturer_name,
    );

    res.status(201).json(subject);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const userId = req.user.userId;

    const subjects = await subjectService.getUserSubjects(userId);
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: "Error while fetching subjects" });
  }
};

export const removeSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    await subjectService.deleteSubject(userId, id);
    res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const editSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const { name, color_code, lecturer_name } = req.body;

    const updated = await subjectService.updateSubject(id, userId, {
      name,
      color_code,
      lecturer_name,
    });

    res.json({ message: "Subject updated", updated });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
