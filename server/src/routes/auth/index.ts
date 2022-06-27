import { Router } from 'express';

// Controllers
import { registerUser, LoginUser, authorizeUser, logoutUser } from '../../controllers/auth';

const router = Router();

router.post('/register', registerUser);
router.get('/logout', logoutUser);
router.get('/login/authorize', authorizeUser);
router.post('/login', LoginUser);

export default router;
