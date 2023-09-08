
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { EnginesController } from './controllers/engines.controller';
import { EnginesService } from './services/engines.service';
import { Engine , EngineSchema } from './entities/engine.entity';
import { CarsController } from './controllers/cars.controller';
import { CarsService } from './services/cars.service';
import { CarSchema , Car } from './entities/car.entity';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Engine.name,
      schema: EngineSchema
    },
    {
      name: Car.name,
      schema: CarSchema,
    },

  ])],
  controllers: [EnginesController, CarsController],
  providers: [EnginesService, CarsService],
  exports: [],
})
export class RacingModule {}
