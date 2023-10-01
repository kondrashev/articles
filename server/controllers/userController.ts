import { compareSync, hash } from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload, sign } from 'jsonwebtoken';
import path from 'path';

import { IUser } from '../../constants/constants';
import User from '../database/models/user';

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
      return next(res.json('User not found!!!'));
    }
    const comparePassword = compareSync(password, user.password);
    if (!comparePassword) {
      return next(res.json('Incorrect password!!!'));
    }
    const token: string = generateJWT(user.login, user.role || 'AUTHOR');
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
      return next(res.json('Incorrect e-mail or password!!!'));
    }
    const getUser: IUser = await User.findOne({ where: { login } });
    if (getUser) {
      return next(res.json('This user already exists!!!'));
    }
    const hashPassword = await hash(password, 5);
    const user: IUser = await User.create({ login, password: hashPassword });
    const token: string = generateJWT(user.login, user.role);
    const userGet = { login: user.login, role: user.role, token };
    return res.json(userGet);
  }

  deleteUsers(req: Request, res: Response) {
    const { listId } = req.body;
    listId.forEach(async (id: string) => {
      await User.destroy({ where: { id } });
    });
    return res.json(listId);
  }

  async uploadFile(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.files['file'];
      file.mv(path.resolve(__dirname, '..', 'static/images', file.name));
      return res.json(`images/${file.name}`);
    } catch (error) {
      next(error);
    }
  }
}
export default new UserController();
