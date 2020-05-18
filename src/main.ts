import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { Transport, MicroserviceOptions } from 'src/tracking/node_modules/@nestjs/microservices';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const microserviceRedis = app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.REDIS,
  //   options: {
  //     url: 'redis://10.0.0.78:6379',
  //   },
  // });

  app.use(compression());
  await app.startAllMicroservicesAsync();
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`APP_PORT= ${process.env.APP_PORT}`);
  console.log(`APP_DB_CONNECTION= ${process.env.APP_DB_CONNECTION}`);
  console.log(`REDIS_URL= ${process.env.REDIS_URL}`);

  console.log(`APP_PORT= `, process.env.APP_PORT);
  console.log(`APP_DB_CONNECTION= `, process.env.APP_DB_CONNECTION);
  console.log(`REDIS_URL= `, process.env.REDIS_URL);

  await app.listen(3001);
 
}
bootstrap();
