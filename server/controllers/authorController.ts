import { NextFunction, Request, Response } from 'express';
import path from 'path';

class AuthorController {
  async uploadFile(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.files['file'];
      file.mv(path.resolve(__dirname, '..', 'static/images', file.name));
      return res.json(file.name);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthorController();
