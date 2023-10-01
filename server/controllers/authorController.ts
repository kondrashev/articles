import { NextFunction, Request, Response } from 'express';

import { IArticle } from '../../constants/constants';
import Article from '../database/models/article';

class AuthorController {
  async getArticles(req: Request, res: Response, next: NextFunction) {
    const { login } = req.query;
    if (!login) {
      return next(res.json('Login is faild!'));
    }
    const articles: IArticle[] = await Article.findAll({ where: { author: login } });
    return res.json(articles);
  }

  async addArticle(req: Request, res: Response, next: NextFunction) {
    const { avatar, login, title, text, userId } = req.body;
    if (!avatar || !login || !title || !text) {
      return next(res.json('Incorrect fields!!!'));
    }
    const article: IArticle = await Article.create({ avatar, author: login, title, text, userId });
    return res.json(article);
  }
}

export default new AuthorController();
