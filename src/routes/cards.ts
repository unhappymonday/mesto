import { Router } from 'express';
import {
  getAllCards, getCardById, createCard, createCardLike, deleteCardLike,
} from '../controllers/cards';

const router = Router();

router.get('/', getAllCards);
router.get('/', getCardById);
router.post('/', createCard);
router.put('/:cardId/likes', createCardLike);
router.delete('/:cardId/likes', deleteCardLike);

export default router;
