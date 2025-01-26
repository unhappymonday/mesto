import { Router } from "express";
import {
  getAllCards,
  getCardById,
  createCard,
  createCardLike,
  deleteCardLike,
} from "../controllers/cards";
import { cardValidation } from "../middleware/card-validate-error-handler";

const router = Router();

router.get("/", getAllCards);
router.get("/:cardId", getCardById);
router.post("/", cardValidation, createCard);
router.put("/:cardId/likes", createCardLike);
router.delete("/:cardId/likes", deleteCardLike);

export default router;
