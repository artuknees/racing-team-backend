
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { EnginesController } from './controllers/engines.controller';
import { EnginesService } from './services/engines.service';
import { Engine , EngineSchema } from './entities/engine.entity';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Engine.name,
      schema: EngineSchema
    },
  ])],
  controllers: [EnginesController],
  providers: [EnginesService],
  exports: [],
})
export class RacingModule {}
