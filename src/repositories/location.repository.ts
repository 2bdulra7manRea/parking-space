import { injectable } from "tsyringe";
import { Location } from "../entities/location.entity";
import { RepositoryApplication } from "./repository";

// Data Access Layer
@injectable()
export class LocationRepository extends RepositoryApplication<Location> {
  constructor() {
    super(Location);
  }

  async findOneById(id: number): Promise<Location | null> {
    return this.repository.findOne({ where: [{ id: id }] });
  }
}
