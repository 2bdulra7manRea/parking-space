import { IsInt, IsOptional, IsString, Validate } from "class-validator";

import { LengthNumberValidator } from "../validations/locationZipCode";

export class UpdatedLocationDTO {
  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsInt()
  @Validate(LengthNumberValidator)
  zipCode: string;
}
