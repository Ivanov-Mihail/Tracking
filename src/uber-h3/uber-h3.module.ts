import { Module } from '@nestjs/common';
import { UberH3Service } from './uber-h3.service';
import { UberH3Controller } from './uber-h3.controller';

@Module({
  providers: [UberH3Service],
  controllers: [UberH3Controller]
})
export class UberH3Module {}
