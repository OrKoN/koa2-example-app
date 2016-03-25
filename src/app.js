import Koa from 'koa';
import api from './api';
import config from './config';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';

const app = new Koa()
  .use(cors())
  .use(async (ctx, next) => {
    ctx.collections = config.collections;
    ctx.authorizationHeader = 'Key ' + config.key;
    await next();
  })
  .use(bodyParser())
  .use(api.routes())
  .use(api.allowedMethods());

export default app;