import "reflect-metadata";
import {
  IsAlpha,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Max,
  Min,
  Validate,
} from "class-validator";
import { NotAllowedWordsValidator } from "../validations/parkingSpaceNames.validator";
import { AllowedWordsValidator } from "../validations/parkingSpaceCategory.validator";

export class UpdatedParkingSpaceDTO {
  @IsOptional()
  @IsString()
  @Length(11, 200, { message: "Name length must be longer than 10 characters" })
  @Validate(NotAllowedWordsValidator)
  name: string;

  @IsOptional()
  @IsInt()
  @Max(5)
  @Min(0)
  rating: number;

  @IsOptional()
  @IsAlpha()
  @Validate(AllowedWordsValidator)
  category: string;

  @IsOptional()
  @IsUrl()
  image: string;

  @IsOptional()
  availability: number;

  @IsOptional()
  capacity: number;

  @IsOptional()
  amenities:string

  @IsOptional()
  @IsInt()
  @Max(1000)
  @Min(0)
  levelNum: number;
}
