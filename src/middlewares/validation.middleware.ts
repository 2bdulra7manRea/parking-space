import { RequestHandler, NextFunction, Request, Response } from "express";
import { Validator } from "class-validator";
import { plainToInstance } from "class-transformer";
import { failedRequestResponse } from "../common/response/response";
import { STATUS_CODE } from "../common/enum/statusCode";

// Needs some refactoring

export function validatorMiddleware<T>(type: any): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const params = req.method === "GET" ? req.params : req.body;
    let input = plainToInstance(type, params);
    let validator = new Validator();
    let errors = validator.validateSync(input);

    if (errors.length > 0) {
      const getAllConstraints = errors.map((error) => {
        return error.constraints;
      });

      return failedRequestResponse(
        STATUS_CODE.BAD_REQUEST,
        { message: "Validation Error", details: getAllConstraints },
        res
      );
    } else {
      next();
    }
  };
}

export function validatorLocationMiddleware<T>(type: any): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.location && req.method === "PATCH") {
      next();
      return;
    }

    if (!req.body.location && req.method === "POST") {
      return failedRequestResponse(
        STATUS_CODE.BAD_REQUEST,
        { message: "Validation Error", details: "Location not found" },
        res
      );
    }

    let input = plainToInstance(type, req.body.location);
    let validator = new Validator();
    let errors = validator.validateSync(input);

    if (errors.length > 0) {
      const getAllConstraints = errors.map((error) => {
        return error.constraints;
      });

      return failedRequestResponse(
        STATUS_CODE.BAD_REQUEST,
        { message: "Validation Error", details: getAllConstraints },
        res
      );
    } else {
      next();
    }
  };
}
