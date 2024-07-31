import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  login,
} from '../controllers/userController';

const router = Router();

// Public route for generating a JWT
router.post('/login', login);

// Protected routes
router.post('/', authenticateToken, createUser);
router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserById);
router.put('/:id', authenticateToken, updateUserById);
router.delete('/:id', authenticateToken, deleteUserById);

export default router;
