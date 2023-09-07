import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Engine } from '../entities/engine.entity';
import { CreateEngineDto , UpdateEngineDto , FilterEngineDto } from '../dtos/engine.dto';

@Injectable()
export class EnginesService {
  constructor(
    @InjectModel(Engine.name) private engineModel: Model<Engine>,
  ) {}

  findAll(params?: FilterEngineDto) {
    if(params) {
      const { limit , offset } = params;
      const { minPowerHp , maxPowerHp , numberOfCylinders , brand } = params;
      const filters: FilterQuery<Engine> = {};
      if (numberOfCylinders) {
        filters.numberOfCylinders = numberOfCylinders
      };
      if (brand) {
        filters.brand = brand
      };
      //     power: { $gte: minPowerHp??0 , $lte: maxPowerHp??99999 }



      return this.engineModel.find(filters).skip(offset).limit(limit).exec();
    }
    return this.engineModel.find().exec(); // asi se hace ahora con mongoose
  }

  async findOne(id: string) {
    const engine = await this.engineModel.findById(id).exec();
    if (!engine) {
      throw new NotFoundException(`Engine #${id} not found`);
    }
    return engine;
  }

  create(data: CreateEngineDto) {
    const newModel = new this.engineModel(data);
    return newModel.save();
  }

  async update(id: string, changes: UpdateEngineDto) { // mongo tiene string de id
    const engine = await this.engineModel
    .findByIdAndUpdate(id, { $set: changes }, {new: true})
    .exec();
    if(!engine) {
      throw new NotFoundException(`Product #${id} not found`)
    }
    return engine;
  }


  async remove(id: string) { // mongo recibe id de string
    const engine = await this.engineModel.findByIdAndDelete(id);
    if(!engine) {
      throw new NotFoundException(`Engine #${id} not found`)
    }
    return engine;
  }

}

