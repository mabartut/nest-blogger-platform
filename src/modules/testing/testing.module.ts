import { Module } from '@nestjs/common';
import { TestingController } from './testing.controller.ts';

@Module({
  imports: [],
  controllers: [TestingController],
})
export class TestingModule {}
