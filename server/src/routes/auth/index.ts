import { Request, Response, Router } from 'express';

// Controllers
import { registerUser, LoginUser } from '../../controllers/auth';

const router = Router();

router.post('/register', registerUser);
router.post('/login', LoginUser);

export default router;
