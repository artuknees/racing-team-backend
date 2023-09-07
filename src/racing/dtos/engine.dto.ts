import { IsString, IsNotEmpty , IsNumber, IsPositive, IsOptional, Min } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateEngineDto {
  @IsString()
  @IsNotEmpty()
  readonly brand: string;

  @IsString()
  @IsNotEmpty()
  readonly model: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly powerHp: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly powerRpm: number

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly torqueNm: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly torqueRpm: number

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly displacement: number

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly numberOfCylinders: number

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly valvesPerCylinder: number

  @IsString()
  @IsNotEmpty()
  readonly configuration: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly hoursOfLife: number
}

export class UpdateEngineDto extends PartialType(CreateEngineDto) {}

export class FilterEngineDto {
  @IsOptional()
  @IsPositive()
  @Min(1)
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;

  @IsOptional()
  brand: string;

  @IsOptional()
  @IsPositive()
  minPowerHp: number;

  @IsOptional()
  @IsPositive()
  maxPowerHp: number;

  @IsOptional()
  @IsPositive()
  numberOfCylinders: number;
}


