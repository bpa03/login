import User from '../../models/User';
import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';

// Error handler
import ErrorHandler from '../../errors/ErrorHanlder';

export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new ErrorHandler(400, 'User exists!');
    }

    try {
      const newUser = User.create(
        { email, password, name: 'Baldassare', lastname: 'Pugliese' },
        { isNewRecord: true }
      );
      res.status(201);
      res.json(newUser);
    } catch (e) {
      throw e;
    }
  }
);
