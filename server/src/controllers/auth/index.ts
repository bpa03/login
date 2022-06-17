import User from '../../models/User';
import asyncHandler from 'express-async-handler';
import { UniqueConstraintError } from 'sequelize';
import { Request, Response } from 'express';

// Error handler
import ErrorHandler from '../../errors/ErrorHanlder';
// Create token
import createToken from '../../lib/creteToken';

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      const message = `The user with email ${email} has been registred`;
      throw new ErrorHandler(400, message);
    }

    try {
      const newUser = await User.create(
        { email, password },
        { isNewRecord: true }
      );
      const userJson = newUser.toJSON();
      const token = createToken(userJson);
      res.status(201);
      res.json({ data: { token, success: true } });
    } catch (e) {
      if (e instanceof UniqueConstraintError) {
        throw new ErrorHandler(400, e.message);
      }
    }
  }
);
