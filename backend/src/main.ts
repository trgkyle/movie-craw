import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
let httpsOptions = {};
try {
  httpsOptions = {
    key: fs.readFileSync('./cert/privkey.pem'),
    cert: fs.readFileSync('./cert/fullchain.pem'),
  };
} catch (e) {}
async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();
  // if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'temp') {
  //   console.log('Server running at : ' + (process.env.PORT || 443));
  //   https.createServer(httpsOptions, server).listen(process.env.PORT || 443);
  // } else {
  console.log('Server running at : ' + (process.env.PORT || 3001));
  http.createServer(server).listen(process.env.PORT || 3001);
  // }
}

bootstrap();
