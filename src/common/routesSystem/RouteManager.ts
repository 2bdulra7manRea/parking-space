import express, { Router, Request, Response, RequestHandler } from "express";
import { RouterHandler } from "./RouteHandler";
import { STATUS_CODE } from "../enum/statusCode";
import { addExpressHandlers } from "../helpers/expressHandlers";

export class RouteManager {
  private route: Router;
  public readonly path: string;
  private controller: any;
  private routeHandler: RouterHandler;
  constructor(path: string, controller: any) {
    this.controller = controller;
    this.path = path;
    this.route = express.Router();
    this.routeHandler = new RouterHandler();
  }

  getRouter() {
    return this.route;
  }

  get(
    endpoint: string,
    callback: RequestHandler,
    middlewares?: RequestHandler[]
  ) {
    const getHandler = (req: Request, res: Response) =>
      this.routeHandler.executeCallbackWithResponse(
        req,
        res,
        STATUS_CODE.SUCCESS,
        callback.bind(this.controller)
      );
    const handlers = addExpressHandlers(getHandler, middlewares);
    this.route.get(endpoint, ...handlers);
  }

  post(
    endpoint: string,
    callback: RequestHandler,
    middlewares?: RequestHandler[]
  ) {
    const postHandler = (req: Request, res: Response) =>
      this.routeHandler.executeCallbackWithResponse(
        req,
        res,
        STATUS_CODE.CREATED,
        callback.bind(this.controller)
      );
    const handlers = addExpressHandlers(postHandler, middlewares);
    this.route.post(endpoint, ...handlers);
  }

  patch(
    endpoint: string,
    callback: RequestHandler,
    middlewares?: RequestHandler[]
  ) {
    const handlers = addExpressHandlers(
      (req: Request, res: Response) =>
        this.routeHandler.executeCallbackWithResponse(
          req,
          res,
          STATUS_CODE.SUCCESS,
          callback.bind(this.controller)
        ),
      middlewares
    );

    this.route.patch(endpoint, ...handlers);
  }

  delete(
    endpoint: string,
    callback: RequestHandler,
    middlewares?: RequestHandler[]
  ) {
    const deleteHandler = (req: Request, res: Response) =>
      this.routeHandler.executeCallbackWithResponse(
        req,
        res,
        STATUS_CODE.SUCCESS,
        callback.bind(this.controller)
      );

    const handlers = addExpressHandlers(deleteHandler, middlewares);
    this.route.delete(endpoint, handlers);
  }
}
