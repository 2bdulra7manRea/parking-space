import { injectable } from "tsyringe";
import { RepositoryApplication } from "./repository";
import { ParkingReservation } from "../entities/parkingReservation.entity";

@injectable()
export class ParkingReservationRepository extends RepositoryApplication<ParkingReservation> {
  constructor() {
    super(ParkingReservation);
  }

  findOneById(id: number): Promise<ParkingReservation | null> {
    return this.repository.findOne({ where: { id: id } });
  }
}
