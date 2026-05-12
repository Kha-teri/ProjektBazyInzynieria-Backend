import { Router } from "express";
import {
  addMaterial,
  getSubjectMaterials,
  removeMaterial,
  editMaterial,
  getMaterials,
} from "../controllers/materialController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", addMaterial);
router.get("/", getMaterials);
router.get("/subject/:subjectId", getSubjectMaterials);
router.delete("/:id", removeMaterial);
router.patch("/:id", editMaterial);

export default router;
