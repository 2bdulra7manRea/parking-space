import { injectable } from "tsyringe";


import { RepositoryApplication } from "./repository";
import { Manager } from "../entities/manager.entity";

// Data Access Layer
@injectable()
export class ManagerRepository extends RepositoryApplication<Manager> {
  constructor() {
    super(Manager);
  }

  
  async findOneById(id: number): Promise<Manager | null> {
    return this.repository.findOne({ where: [{ id: id }] });
  }
}