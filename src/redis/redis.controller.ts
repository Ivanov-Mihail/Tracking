import { Controller } from '@nestjs/common';
import {
  RedisContext,
  Ctx,
  Payload,
  MessagePattern,
} from '@nestjs/microservices';


@Controller('redis')
export class RedisController {

  @MessagePattern('tracking.newreport')
  getNotifications(@Payload() data: string, @Ctx() context: RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    console.log(`Data: ${JSON.stringify(data)}`);
    console.log(`Data: ${data}`);

   }

}
