import * as scheduleService from "../services/scheduleService.js";

export const addEntry = async (req, res) => {
  try {
    const entry = await scheduleService.createScheduleEntry(
      req.user.userId,
      req.body,
    );
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({
      error: "Error while adding class schedule",
      details: error.message,
    });
  }
};

export const getUserSchedule = async (req, res) => {
  try {
    const schedule = await scheduleService.getSchedule(req.user.userId);
    res.json(schedule);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error while fetching user class shcedules" });
  }
};

export const editEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await scheduleService.updateScheduleEntry(
      id,
      req.user.userId,
      req.body,
    );
    res.json(updated);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const removeEntry = async (req, res) => {
  try {
    const { id } = req.params;
    await scheduleService.deleteScheduleEntry(id, req.user.userId);
    res.json({ message: "Entry has been deleted from the schedule" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
