import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DbModule } from 'src/db/db.module';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';
import { AuthModule } from 'cityride-auth/dist/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'RedisClient',
        transport: Transport.REDIS,
        options: {
          url: process.env.REDIS_URL,
        },
      },
    ]),

    AuthModule.registerFrom({
      redisIp: '10.0.0.78',
      redisPort: '6379',
      jwtPublicKey: `-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAskm3BMjUXUtCLQu3+XxV7rns9EA56VjXYfozk4kZS6JxGNFVEDacO87F5GHxNguif1LbdtKGoPhUjy4GfSdcNO8c+rPjewvLJfrHnOiQAxsA3gbg0sOXZ6xwuxhfLLVMgj7ZR8Q8TZ0NRLQRhivoxg2NWw94lmAsX8BuchxyznqgR80/sxeTg3v9S6FN6uPW1AGyt8H7IacLt+j2aHYxvBq1iJ6vAcxBqCO1Cu+ztJ1YyeN/8kkWwywoEFSBnuhkLH2Mr0j6ogQ6Nyej+vpfMc4bDWif/xNMOwaeL9cOXmYyr98XRX5YtbIkcuW68k0Eiz0Af/J1JuezZkwRyr+tWbZUwrutfSV220FBOIzGNlvBsRBJH8mav0S02+kJaj7jINX2q8drAGvisJd5UMXJbOQqc0MAnUIROfPqRxOjS7iBImKdunL4d95iKrXFdF2ap7IDcvqYN8Q2WGTXXriXveI9xOpnjgjJQ9FXeunU5JkCvIN00/VmX5OrtKkMhbbHkg17DaWXzv4G8FFKu1WD8F6zIRzlSXML8fBeOyci5CMByiJIf955oamQq998NU6xTtPKDq4Qpa8CuBvMYERoc+ghC33tMhofu5tGqhrAeHEruFgWHZKqbSkna1CsRMokWgh/8rC146tB2pI/CSp2Fod0fP9BuyIqAzs/vIyLUoUCAwEAAQ==\n-----END PUBLIC KEY-----`,
    }),

    DbModule,
  ],
  providers: [TrackingService],
  controllers: [TrackingController],
})
export class TrackingModule {}
