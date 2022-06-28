import { Router } from 'express';
import { body } from 'express-validator';
import { validationForm } from '../../middlewares/validationForm';

// Controllers
import {
  registerUser,
  loginUser,
  authorizeUser,
  logoutUser,
} from '../../controllers/auth';

const router = Router();

router.post('/register', registerUser);
router.get('/logout', logoutUser);
router.get('/login/authorize', authorizeUser);

// Login controller
router.post(
  '/login',
  body('email')
    .normalizeEmail()
    .trim()
    .isEmail()
    .withMessage('Invalid username'),
  body('password')
    .isAlphanumeric()
    .isLength({ min: 8 })
    .withMessage('Invalid password'),
  validationForm,
  loginUser
);

export default router;
