import * as userService from "../services/userService.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const profile = await userService.getUserProfile(userId);

    if (!profile) {
      return res.status(404).json({ error: "User does not exist" });
    }
    res.json(profile);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Fetching profile error", details: error.message });
  }
};
