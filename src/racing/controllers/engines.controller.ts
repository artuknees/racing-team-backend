import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { MongoIdPipe } from '../../common/mongo-id.pipe'; // pipe para validar si el id es mongo Id
import { CreateEngineDto , UpdateEngineDto , FilterEngineDto } from '../dtos/engine.dto';
import { EnginesService } from './../services/engines.service';

@ApiTags('Engines')
@Controller('engines')
export class EnginesController {
  constructor(private enginesService: EnginesService) {}

  @Get()
  @ApiOperation({ summary: 'List of engines' })
  getProducts(@Query() params: FilterEngineDto) {
    return this.enginesService.findAll(params);
  }

  @Get(':engineId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('engineId', MongoIdPipe) productId: string) {
    return this.enginesService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateEngineDto) {
    return this.enginesService.create(payload);
  }

  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateEngineDto) {
    return this.enginesService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.enginesService.remove(id);
  }
}
