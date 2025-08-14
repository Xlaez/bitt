import { Type } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsOptional,
} from "class-validator";

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @IsNotEmpty()
  pricePerNight: number;

  @IsArray()
  @IsOptional()
  amenities: string[];

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  description: string;
}

export class UpdateRoomDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsNumber()
  @IsOptional()
  pricePerNight?: number;

  @IsArray()
  @IsOptional()
  amenities?: string[];

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class GetRoomsDto {
  @IsString()
  @IsOptional()
  location?: string;

  @IsNumber()
  page: number;

  @IsNumber()
  limit: number;
}
