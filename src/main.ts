import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  app.use(compression());

  //console.log(`APP_DB_CONNECTION   =`, process.env.APP_DB_CONNECTION.toLocaleUpperCase());
  //console.log(`REDIS_URL           =`, process.env.REDIS_URL.toLocaleUpperCase());

  await app.startAllMicroservicesAsync();
  await app.listen(3001);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
