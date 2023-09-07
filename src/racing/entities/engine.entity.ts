import { Prop , Schema , SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Engine extends Document { // heredo de Document de Mongoose
  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  model: string;

  @Prop({ type: Number , required: true })
  powerHp: number;

  @Prop({ type: Number , required: true })
  powerRpm: number;

  @Prop({ type: Number , required: true })
  torqueNm: number;

  @Prop({ type: Number , required: true })
  torqueRpm: number;

  @Prop({ type: Number , required: true })
  displacement: number;

  @Prop({ type: Number , required: true })
  numberOfCylinders: number;

  @Prop({ type: Number , required: true })
  valvesPerCylinder: number;

  @Prop({ required: true })
  configuration: string;

  @Prop({ type: Number , required: true })
  hoursOfLife: number;
}

export const EngineSchema = SchemaFactory.createForClass(Engine);

