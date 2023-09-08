import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Car } from '../entities/car.entity';
import { CreateCarDto, UpdateCarDto } from '../dtos/car.dto';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private carModel: Model<Car>) {}

  findAll() {
    return this.carModel.find().exec();
  }

  async findOne(id: string) {
    return this.carModel.findById(id).populate('engines').exec();
  }

  create(data: CreateCarDto) {
    const newModel = new this.carModel(data);
    return newModel.save();
  }

  update(id: string, changes: UpdateCarDto) {
    return this.carModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.carModel.findByIdAndDelete(id);
  }

  async removeEngine(id: string , engineId: string) {
    const car = await this.carModel.findById(id);
    car.engines.pull(engineId);
    return car.save();
  }

  async addEngines(id: string , enginesId: string[]) {
    const car = await this.carModel.findById(id);
    enginesId.forEach((pid) => car.engines.push(pid));
    return car.save();
  }

}
