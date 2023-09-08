import { Prop , Schema , SchemaFactory } from '@nestjs/mongoose';
import { Document , Types } from 'mongoose';
import { Engine } from './engine.entity'


@Schema()
export class Car extends Document { // heredo de Document de Mongoose
  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  active: boolean;

  @Prop({ type: Date, default: Date.now }) // date as default
  createdAt: Date;

  // relacion uno a muchos referenciada
  @Prop({ type: [{type: Types.ObjectId , ref: Engine.name}] }) // voy a tener engines id
  engines: Types.Array<Engine>;
}

export const CarSchema = SchemaFactory.createForClass(Car);
