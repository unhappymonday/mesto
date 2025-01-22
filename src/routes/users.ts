import { Router } from 'express';
import { getAllUsers, getUserById, createUser } from '../controllers/users';

const router = Router();

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);

export default router;
