import { compareSync } from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload, sign } from 'jsonwebtoken';

import { IUser } from '../../constants/constants';
import ApiError from '../error/apiError';
import { User } from '../models/models';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

const generateJWT = (login: string, role: string) => {
  return sign({ login, role }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};

class UserController {
  authorization(req: Request, res: Response) {
    res.sendFile('index.html', { root: './server/static/' });
  }

  async checkAuthorisation(req: Request, res: Response, next: NextFunction) {
    const { login, password } = req.body;
    const user: IUser = await User.findOne({ where: { login } });
    if (!user) {
      return next(ApiError.internal('User not found!!!'));
    }
    const comparePassword = compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal('Incorrect password!!!'));
    }
    const token: string = generateJWT(user.login, user.role || 'author');
    const getUser = { login: user.login, role: user.role, token };
    return res.json(getUser);
  }
}
export default new UserController();
