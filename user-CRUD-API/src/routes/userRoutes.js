
import express from 'express';

import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import {
  validateCreateUser,
  validateUpdateUser,
  validateUserId
} from '../middleware/validateUser.js';

const router = express.Router();

router.route('/')
  .get(getAllUsers)
  .post(validateCreateUser, createUser);

router.route('/:id')
  .get(validateUserId, getUserById)
  .put(validateUserId, validateUpdateUser, updateUser)
  .delete(validateUserId, deleteUser);

export default router;
