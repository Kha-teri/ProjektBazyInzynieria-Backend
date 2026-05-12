import { Router } from "express";
import * as fcController from "../controllers/flashcardController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();
router.use(authMiddleware);

router.post("/sets", fcController.createNewSet);
router.get("/sets", fcController.getUserSets);
router.get("/sets/:setId", fcController.getSingleSet);

router.post("/sets/:setId/cards", fcController.addCard);
router.patch("/cards/:id/learned", fcController.markAsLearned);

export default router;
