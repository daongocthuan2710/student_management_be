/* eslint-disable prettier/prettier */
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  list_id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  position: number;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}

export class UpdateAllCardDto {
  @IsNotEmpty()
  @IsString()
  list_id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  position: number;

  @IsNotEmpty()
  status: boolean;
}

export class UpdateCardDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  list_id: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  position: number;

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  status: boolean;
}

export class UpdateManyCardDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  old_list_id: string;

  @IsNotEmpty()
  @IsObject()
  body: {
    list_id?: string;
    title?: string;
    description?: string;
    position?: number;
    status?: boolean;
  };

  @IsNotEmpty()
  @IsObject()
  @IsOptional()
  params: {
    old_position?: number;
  };
}
