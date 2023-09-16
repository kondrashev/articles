import { compareSync, hash } from 'bcryptjs';
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
      return next(ApiError.badRequest('User not found!!!'));
    }
    const comparePassword = compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.badRequest('Incorrect password!!!'));
    }
    const token: string = generateJWT(user.login, user.role || 'author');
    const getUser = { login: user.login, role: user.role, token };
    return res.json(getUser);
  }

  async getUsers(req: Request, res: Response) {
    const users: IUser[] = await User.findAll({ where: { role: 'AUTHOR' } });
    return res.json(users);
  }

  async addUser(req: Request, res: Response, next: NextFunction) {
    const { login, password } = req.body;
    if (!login || !password) {
      return next(ApiError.badRequest('Incorrect e-mail or password!!!'));
    }
    const getUser: IUser = await User.findOne({ where: { login } });
    if (getUser) {
      return next(ApiError.badRequest('This user already exists!!!'));
    }
    const hashPassword = await hash(password, 5);
    const user: IUser = await User.create({ login, password: hashPassword });
    const token: string = generateJWT(user.login, user.role);
    return res.json({ token });
  }

  deleteUsers(req: Request, res: Response) {
    const { listId } = req.body;
    const idS: string[] = JSON.parse(listId);
    idS.forEach(async (id: string) => {
      await User.destroy({ where: { id } });
    });
    return res.json(idS);
  }
}
export default new UserController();
