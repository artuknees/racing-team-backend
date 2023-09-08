import { IsNotEmpty, IsArray, IsString, IsBoolean } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  readonly brand: string;

  @IsNotEmpty()
  @IsString()
  readonly model: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly active: boolean;

  @IsArray()
  readonly engines: string[];
}

export class UpdateCarDto extends PartialType(
  OmitType(CreateCarDto, ['engines'])
) {}

export class AddEnginesToCarDto {
  @IsArray()
  @IsNotEmpty()
  readonly enginesIds: string[]
}
