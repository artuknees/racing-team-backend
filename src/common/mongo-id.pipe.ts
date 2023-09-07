import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isMongoId } from 'class-validator'

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if(!isMongoId(value)) { // me fijo si es un mongo id
      throw new BadRequestException(`${value} is not a mongo Id`);
    }
    return value;
  }
}
