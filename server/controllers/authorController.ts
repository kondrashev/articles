import { NextFunction, Request, Response } from 'express';

import { IArticle } from '../../constants/constants';
import Article from '../database/models/article';

class AuthorController {
  async getArticles(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.query;
    if (!userId) {
      return next(res.json('userId is faild!'));
    }
    const articles: IArticle[] = await Article.findAll({
      where: { userId },
      order: [['id', 'DESC']],
    });
    return res.json(articles);
  }

  async addArticle(req: Request, res: Response) {
    const { avatar, login, title, text, userId } = req.body;
    const article: IArticle = await Article.create({
      avatar: String(avatar),
      login: String(login),
      title: String(title),
      text: String(text),
      userId: Number(userId),
    });
    return res.json(article);
  }

  deleteArticles(req: Request, res: Response) {
    const { listId } = req.body;
    listId.forEach(async (id: string) => {
      await Article.destroy({ where: { id } });
    });
    return res.json(listId);
  }

  async updateArticle(req: Request, res: Response) {
    const { id, title, text } = req.body;
    await Article.update({ id: Number(id), title: String(title), text: String(text) }, { where: { id } });
    const article: IArticle = await Article.findOne({ where: { id } });
    return res.json(article);
  }

  async updateArticleAvatar(req: Request, res: Response) {
    const { login, avatar } = req.body;
    await Article.update({ avatar: String(avatar) }, { where: { login } });
    const articles: IArticle[] = await Article.findAll({ where: { login } });
    return res.json(articles);
  }
}

export default new AuthorController();
