import { config } from 'dotenv';

import endpoints from '../constants/endpoints';
config();
import cors from 'cors';
import express, { json, Request, Response, static as stat } from 'express';
import path from 'path';

import { User } from '../server/models/models';
import router from '../server/routes/index';
import db from './db';
import errorHandler from './middleware/ErrorHandlingMiddleware';

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(json());
app.use(endpoints.authorization, router);
app.use(stat(path.resolve(__dirname, 'static')));
app.use(errorHandler);

(async () => {
  try {
    await db.sync({ alter: true });
    const getUserAd = await User.findOne({ where: { login: 'pavel' } });
    !getUserAd &&
      (await User.create({
        login: 'admin',
        password: '$2a$05$U7VzSGcmtMhpeFNZonkYvO1wUzlzG46qwEyU3NQ7wHsDupWtfjcyu',
        role: 'ADMIN',
      }));
    app.get(endpoints.authorization, (req: Request, res: Response) => {
      res.sendFile('index.html', { root: './server/static/' });
    });
    // eslint-disable-next-line no-console
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
})();
