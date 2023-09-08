import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CarsService } from '../services/cars.service';
import { CreateCarDto, UpdateCarDto, AddEnginesToCarDto } from '../dtos/car.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';


@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) { }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCarDto) {
    return this.carsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCarDto) {
    return this.carsService.update(id, payload);
  }

  @Put(':id/engines') // endpoint para agregar motores
  updateProducts(
    @Param('id') id: string,
    @Body() payload: AddEnginesToCarDto
  ) {
    return this.carsService.addEngines(id, payload.enginesIds);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }

  @Delete(':id/engine/:engineId') // para eliminar un producto de una orden
  removeProduct(
    @Param('id', MongoIdPipe) id: string,
    @Param('engineId', MongoIdPipe) engineId: string
  ) {
    return this.carsService.removeEngine(id, engineId);
  }
}
