import { Express, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { version } from '../../package.json';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Docs',
      version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: ['http', 'https'],
          schema: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    servers: [
      {
        url: 'http://localhost',
        description: 'Development server',
      },
    ],
  },
  apis: ['./server/routes/*.ts', './server/database/models/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);
// eslint-disable-next-line import/no-named-as-default-member
const { serve, setup } = swaggerUi;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const swaggerDocs = (app: Express, port: string) => {
  app.use('/docs', serve, setup(swaggerSpec));
  app.get('docs.json', (res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};

export default swaggerDocs;
