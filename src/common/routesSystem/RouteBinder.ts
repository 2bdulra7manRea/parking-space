import { Application } from "express";
import { logger } from "../../configs/logger.config";
import { RouteManager } from "./RouteManager";

export class RouteBinder {
  private readonly application: Application;
  constructor(application: Application) {
    this.application = application;
  }
  register(routeManager: RouteManager) {
    this.application.use(routeManager.path, routeManager.getRouter());
    logger.info(`[New Route Added] => ${routeManager.path}:`);
  }
}
