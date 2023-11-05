import { Request, Response } from 'express';
import { Op } from 'sequelize';

import { IArticle } from '../../constants/constants';
import Article from '../database/models/article';

class PublicController {
  async listArticles(req: Request, res: Response) {
    const { page } = req.query;
    const articles: IArticle[] = await Article.findAndCountAll({
      limit: 2,
      offset: Number(page) * 2,
    });
    return res.json(articles);
  }

  async searchArticles(req: Request, res: Response) {
    const { pattern } = req.query;
    const articles: IArticle[] = await Article.findAll({ where: { title: { [Op.startsWith]: pattern } } });
    return res.json(articles);
  }
}

export default new PublicController();
