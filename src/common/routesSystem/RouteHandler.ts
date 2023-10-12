import { Request, Response } from "express";
import { STATUS_CODE } from "../enum/statusCode";
import { Exception } from "../error/Exception";
import {
  failedRequestResponse,
  succussRequestResponse,
} from "../response/response";
export class RouterHandler {
  /**
   *
   * @param req
   * @param res
   * @param status
   * @param callback
   *
   */

  async executeCallbackWithResponse(
    req: Request,
    res: Response,
    status: number,
    callback: Function
  ) {
    try {
      const results = await callback(req, res);
      return succussRequestResponse(status, results, res);
    } catch (error: any) {
      const statusCode = error?.code || STATUS_CODE.BAD_REQUEST;
      return failedRequestResponse(
        statusCode,
        { message: error?.message, details: error?.details || null },
        res
      );
    }
  }
}
