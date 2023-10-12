import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { CATEGORIES_PARKING_SPACE } from "../common/constants/constants";

@ValidatorConstraint({ name: "allowedWordsValidator", async: false })
export class AllowedWordsValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (!value || typeof value !== "string") {
      return false;
    }

    return CATEGORIES_PARKING_SPACE.some(
      (word) => value.toLowerCase() === word
    );
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be one of ${CATEGORIES_PARKING_SPACE.join(
      " - "
    )} `;
  }
}
