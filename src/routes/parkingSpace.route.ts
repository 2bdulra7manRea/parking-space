import { dependencyContainer } from "../configs/container.config";
import { ParkingSpaceController } from "../controllers/parkingSpace.controller";
import { RouteManager } from "../common/routesSystem/RouteManager";
import {
  validatorLocationMiddleware,
  validatorMiddleware,
} from "../middlewares/validation.middleware";
import { ParkingSpace } from "../entities/parkingSpace.entity";
import { Location } from "../entities/location.entity";
import { UpdatedLocationDTO } from "../dto-requests/location.dto";
import { UpdatedParkingSpaceDTO } from "../dto-requests/parkingSpace.dto";

const parkingSpaceController = dependencyContainer.resolve(
  ParkingSpaceController
);

const parkingSpaceRouter = new RouteManager(
  "/parking-space",
  parkingSpaceController
);

/**
 * @swagger
 *
 * /parking-space/list/{managerId}:
 *   get:
 *     summary : Find parkingSpace items by manager id
 *     tags:
 *       - parkingSpace
 *     parameters:
 *       - in: path
 *         name: managerId
 *         required: true
 *         schema :
 *           type: integer
 *       - in: query
 *         name: offset
 *         schema:
 *           type : integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type : integer
 *       - in: query
 *         name: rating
 *         schema:
 *           type : integer
 *       - in: query
 *         name: level
 *         schema:
 *           type : string
 *       - in: query
 *         name: city
 *         schema:
 *           type : string
 *
 *     responses:
 *       200:
 *         description: A list of parkingSpace items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Failed to find the parkingSpace items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 statusCode:
 *                    type: number
 *                 error:
 *                    type: object
 *
 *
 */
parkingSpaceRouter.get(
  "/list/:managerId",
  parkingSpaceController.findAllParkingSpaceByManagerId
);

/**
 * @swagger
 *
 * /parking-space/{id}:
 *   get:
 *     description: returns parkingSpace item based on id
 *     summary : Find parkingSpace by id
 *     tags:
 *       - parkingSpace
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema :
 *           type: integer
 *     responses:
 *       200:
 *         description: a single parkingSpace item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 statusCode:
 *                    type: number
 *                 error:
 *                    type: object
 *       400:
 *         description: Failed to find the parkingSpace item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 statusCode:
 *                    type: number
 *                 error:
 *                    type: object
 */

parkingSpaceRouter.get("/:id", parkingSpaceController.findParkingSpaceById);

/**
 * @swagger
 *
 * /parking-space/new:
 *   post:
 *     description: Add a new item of parkingSpace
 *     summary : Add a new item of parkingSpace
 *     tags:
 *       - parkingSpace
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                type: string
 *               rating:
 *                 type: integer
 *               category:
 *                 type: string
 *               availability:
 *                 type: integer
 *               levelNum:
 *                 type: integer
 *               location:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                   zipCode:
 *                     type: integer
 *                   address:
 *                     type : string
 *                   country:
 *                     type: string
 *                   state:
 *                     type: string
 *               image:
 *                 type: string
 *               amenities:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               managerId:
 *                 type: integer
 *
 *     responses:
 *       201:
 *         description: Added the parking Space item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 statusCode:
 *                    type: number
 *                 error:
 *                    type: object
 *       400:
 *         description: Failed to add the parking Space item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 statusCode:
 *                    type: number
 *                 error:
 *                    type: object
 *
 */
parkingSpaceRouter.post("/new", parkingSpaceController.addNewParkingSpace, [
  validatorMiddleware(ParkingSpace),
  validatorLocationMiddleware(Location),
]);

/**
 * @swagger
 *
 * /parking-space/{managerId}/{id}:
 *   delete:
 *     description: delete item of parkingSpace
 *     summary : delete item of parkingSpace
 *     tags:
 *       - parkingSpace
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema :
 *           type: integer
 *       - in: path
 *         name: managerId
 *         required: true
 *         schema :
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: deleted the parkingSpace item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 statusCode:
 *                    type: number
 *                 error:
 *                    type: object
 *       400:
 *         description: Failed to delete the parkingSpace item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 statusCode:
 *                    type: number
 *                 error:
 *                    type: object
 */
parkingSpaceRouter.delete(
  "/:managerId/:id",
  parkingSpaceController.deleteParkingSpace
);

/**
 * @swagger
 *
 * /parkingSpace/booking/{id}:
 *   patch:
 *     description: book the parkingSpace
 *     summary : book the parkingSpace
 *     tags:
 *       - parkingSpace
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema :
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: booked the parkingSpace item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 statusCode:
 *                    type: number
 *                 error:
 *                    type: object
 *       400:
 *         description: Failed to book the parkingSpace item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 statusCode:
 *                    type: number
 *                 error:
 *                    type: object
 */
parkingSpaceRouter.patch(
  "/booking/:id",
  parkingSpaceController.bookParkingSpace
);

/**
 * @swagger
 *
 * /parkingSpace/{managerId}/{id}:
 *   patch:
 *     description: Update an item of parkingSpace
 *     summary : Update an item of parkingSpace
 *     tags:
 *       - parkingSpace
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema :
 *           type: integer
 *       - in: path
 *         name: managerId
 *         required: true
 *         schema :
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                type: string
 *               rating:
 *                 type: integer
 *               category:
 *                 type: string
 *               availability:
 *                 type: integer
 *               levelNum:
 *                 type: integer
 *               capacity:
 *                 type: integer
 *               amenities:
 *                 type: string
 *               location:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                   zipCode:
 *                     type: integer
 *                   address:
 *                     type: string
 *                   country:
 *                     type: string
 *                   state:
 *                     type: string
 *               image:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: updated the parkingSpace item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 statusCode:
 *                    type: number
 *                 error:
 *                    type: object
 *       400:
 *         description: Failed to update the parkingSpace item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 statusCode:
 *                    type: number
 *                 error:
 *                    type: object
 *
 */

parkingSpaceRouter.patch(
  "/:managerId/:id",
  parkingSpaceController.updateParkingSpace,
  [validatorMiddleware(UpdatedParkingSpaceDTO),validatorLocationMiddleware(UpdatedLocationDTO)]
);

export { parkingSpaceRouter };
