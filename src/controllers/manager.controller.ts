import { Request } from "express";
import { ManagerService } from "../services/manager.service";
import { injectable } from "tsyringe";

@injectable()
export class ManagerController {
  constructor(private managerService: ManagerService) {}
  create(req: Request) {
    return this.managerService.create(req.body);
  }
}
