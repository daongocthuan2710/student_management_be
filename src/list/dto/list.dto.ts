/* eslint-disable prettier/prettier */
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateListDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  position: number;

  @IsNotEmpty()
  @IsOptional()
  @IsBoolean()
  status: boolean;
}

export class UpdateAllListDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  position: number;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}

export class UpdateListDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  position?: number;

  @IsNotEmpty()
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}

export class UpdateManyListDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsObject()
  body: {
    name?: string;
    position?: number;
    status?: boolean;
  };

  @IsOptional()
  @IsObject()
  params?: {
    old_position: number;
  };
}
