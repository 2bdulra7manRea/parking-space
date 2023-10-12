import { injectable } from "tsyringe";
import { ParkingSpace } from "../entities/parkingSpace.entity";
import { RepositoryApplication } from "./repository";

@injectable()
export class ParkingSpaceRepository extends RepositoryApplication<ParkingSpace> {
  constructor() {
    super(ParkingSpace);
  }

  async findOneById(id: number): Promise<ParkingSpace | null> {
    return this.repository.findOne({ where: [{ id: id }] });
  }
}
