import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { LENGTH_ZIP_CODE } from "../common/constants/constants";

@ValidatorConstraint({ name: "lengthNumberValidator", async: false })
export class LengthNumberValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (!value) {
      return false;
    }

    if (value.toString().length !== LENGTH_ZIP_CODE) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} Length must be exactly ${LENGTH_ZIP_CODE} digits.`;
  }
}
