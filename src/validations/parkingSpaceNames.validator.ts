import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { NOT_ALLOWED_NAMES_PARKING_SPACE } from "../common/constants/constants";

@ValidatorConstraint({ name: "notAllowedWordsValidator", async: false })
export class NotAllowedWordsValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (!value || typeof value !== "string") {
      return false;
    }

    for (const iterator of NOT_ALLOWED_NAMES_PARKING_SPACE) {
      if (value.toLowerCase().includes(iterator.toLowerCase())) {
        return false;
      }
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${
      args.property
    } cannot contains any of ${NOT_ALLOWED_NAMES_PARKING_SPACE.join(" - ")}. `;
  }
}
