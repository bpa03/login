import User from '../../models/User';
import asyncHandler from 'express-async-handler';
import { UniqueConstraintError } from 'sequelize';
import { Request, Response } from 'express';

// Error handler
import HttpException from '../../errors/ErrorHanlder';
// Create token
import createToken from '../../lib/creteToken';

interface RequestLoginUser {
  email: string;
  password: string;
}

interface RequestRegisterUser {
  email: string;
  password: string;
  name: string;
  lastName: string;
}

export const registerUser = asyncHandler(
  async (req: Request<{}, {}, RequestRegisterUser>, res: Response) => {
    const { email, password, name, lastName } = req.body;
    const userExists = await User.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      const message = `Invalid register credentials`;
      throw HttpException.fromAuthError(400, message);
    }

    try {
      const newUserBody = { email, password, name, lastName };
      const newUser = await User.create(newUserBody, { isNewRecord: true });
      const userJson = newUser.toJSON();
      const token = createToken(userJson);
      req.session.authorized = true;
      req.session.userId = userJson.id;
      res.status(201);
      res.json({ data: { token, success: true } });
    } catch (e) {
      if (e instanceof UniqueConstraintError) {
        throw HttpException.fromAuthError(400, e.message);
      }
    }
  }
);

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  if (req.session.authorized && req.session.userId) {
    req.session.destroy((err) => {
      console.log(err);
    });
    res.status(204).send();
  }
});

export const authorizeUser = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.session.authorized && !req.session.userId) {
      throw HttpException.fromAuthError(401, 'Unauthorized');
    }

    const { userId } = req.session;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      throw HttpException.fromAuthError(401, 'Unathorized');
    }

    const userJson = user.toJSON();
    const token = createToken(userJson);
    res.status(200).json({
      data: {
        success: true,
        token,
      },
    });
  }
);

export const loginUser = asyncHandler(
  async (req: Request<{}, {}, RequestLoginUser>, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      const message = `Invalid credentials`;
      throw HttpException.fromAuthError(401, message);
    }

    const isEqual = await user.comparePassword(password);
    if (!isEqual) {
      const message = 'Invalid credentials';
      throw HttpException.fromAuthError(401, message);
    }

    const userJson = user.toJSON();
    const token = createToken(userJson);
    req.session.authorized = true;
    req.session.userId = userJson.id;
    res.status(200).json({
      data: {
        success: true,
        token,
      },
    });
  }
);
