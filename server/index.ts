import { config } from 'dotenv';

import endpoints from '../constants/endpoints';
config();
import cors from 'cors';
import express, { json, Request, Response, static as stat } from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';

import router from '../server/routes/index';
import connection from './database/connection';
import User from './database/models/user';
import swaggerDocs from './documentation/swagger';
import errorHandler from './middleware/ErrorHandlingMiddleware';

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(json());
app.use(fileUpload({}));
app.use(endpoints.authorization, router);
app.use(stat(path.resolve(__dirname, 'static')));
app.use(errorHandler);

(async () => {
  try {
    await connection.sync({ alter: true });
    const getUserAd = await User.findOne({ where: { login: 'admin' } });
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
    swaggerDocs(app, PORT);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
})();
