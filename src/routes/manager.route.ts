import { RouteManager } from "../common/routesSystem/RouteManager";
import { dependencyContainer } from "../configs/container.config";
import { ManagerController } from "../controllers/manager.controller";

const managerController = dependencyContainer.resolve(ManagerController);

const ManagerRouter = new RouteManager("/manager", managerController);
/**
 * @swagger
 *
 * /manager/new:
 *   post:
 *     description: Add a new item of manager
 *     summary : Add a new item of manager
 *     tags:
 *       - manager
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                type: string
 *     responses:
 *       201:
 *         description: Added a new manager item
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
 *         description: Failed to add the manager item
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

//adding route into router express object
ManagerRouter.post("/new", managerController.create);

export default ManagerRouter;
