import 'reflect-metadata';

import { Container } from 'typedi';
import helmet = require('helmet');
import { useContainer, useExpressServer } from 'routing-controllers';
import { Application } from 'express';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const main = async () => {
  dotenv.config();
  useContainer(Container);

  const app: Application = express();
  app.use(cors({}));
  app.use(helmet());

  useExpressServer(app, {
    routePrefix: '/api',
    classTransformer: true,
    validation: true,
    controllers: [__dirname + '/**/controller/**/*{.ts,.js}'],
  });

  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  const port = process.env.PORT || 3000;
  const host = '0.0.0.0';
  app.listen(3000, host, () => {
    console.log(`Server started on port ${port} and host ${host}`);
  });
};

main().catch((err) => {
  console.error(err);
});
