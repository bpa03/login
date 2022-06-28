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

// Register controller
router.post(
  '/register',
  body('email')
    .normalizeEmail({ all_lowercase: true })
    .toLowerCase()
    .trim()
    .isEmail()
    .withMessage('Invalid username or email'),
  body('password')
    .isAlphanumeric('en-US')
    .isLength({ min: 8 })
    .withMessage('Invalid Password'),
  body('name')
    .trim()
    .isAlpha()
    .withMessage('The name can only have letters'),
  body('lastName')
    .trim()
    .isAlpha()
    .withMessage('The last name can only have letters'),
  validationForm,
  registerUser
);
router.get('/logout', logoutUser);
router.get('/login/authorize', authorizeUser);

// Login controller
router.post(
  '/login',
  body('email')
    .normalizeEmail({ all_lowercase: true })
    .toLowerCase()
    .trim()
    .isEmail()
    .withMessage('Invalid username or email'),
  body('password')
    .isAlphanumeric()
    .isLength({ min: 8 })
    .withMessage('Invalid password'),
  validationForm,
  loginUser
);

export default router;
