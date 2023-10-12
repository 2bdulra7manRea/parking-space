import { logger } from "../../configs/logger.config";
import { STATUS_CODE } from "../enum/statusCode";

export class Exception extends Error {
  protected readonly code: STATUS_CODE | undefined;
  protected readonly details: any | undefined;

  constructor(message: string, code?: STATUS_CODE, details?: any) {
    super(message);
    logger.error(message);
    this.code = code;
    this.details = details;
  }
}
