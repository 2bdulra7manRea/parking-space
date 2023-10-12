import { RequestHandler } from "express";

export function addExpressHandlers(
  routeCallback: RequestHandler,
  middlewares?: RequestHandler[]
) {
  const handlers: RequestHandler[] = [];
  if (!!middlewares && middlewares.length) {
    handlers.push(...middlewares);
  }
  handlers.push(routeCallback);

  return handlers;
}
