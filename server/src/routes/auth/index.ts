import { Request, Response, Router } from 'express';

// Controllers
import { registerUser } from '../../controllers/auth';

const router = Router();

router.post('/register', registerUser);

router.post('/login', (req: Request, res: Response) => {
  const { body } = req;
  res.status(200).json(body);
});

export default router;
