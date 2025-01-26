import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
} from "../controllers/users";
import { userValidation } from "../middleware/user-validate-error-handler";

const router = Router();

router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.post("/", userValidation, createUser);
router.patch("/me", userValidation, updateUser);
router.patch("/me/avatar", userValidation, updateAvatar);

export default router;
