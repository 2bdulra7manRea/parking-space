import { injectable } from "tsyringe";
import { ManagerRepository } from "../repositories/manager.repository";

@injectable()
export class ManagerService {
  constructor(private managerRepository: ManagerRepository) {}

  create(body: any) {
    return this.managerRepository.create(body);
  }
}
