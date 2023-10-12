import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import { swaggerSetup } from "./configs/swagger.config";
import { parkingSpaceRouter } from "./routes/parkingSpace.route";
import { RouteBinder } from "./common/routesSystem/RouteBinder";
import managerRouter from "./routes/manager.route";

const application = express();

const routeBinder = new RouteBinder(application);

// middlewares
application.use(express.json());
application.use(morgan("tiny"));

// routes
routeBinder.register(parkingSpaceRouter);
routeBinder.register(managerRouter);

// swagger documentation
swaggerSetup(application);

export default application;
