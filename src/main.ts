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
  await app.listen(3001);
}
bootstrap();
