import { ParkingSpace } from "../../entities/parkingSpace.entity";
import { Exception } from "../error/Exception";
import { parkingSpaceMessages } from "../messages/parkingSpace";

export function decreaseParkingSpaceAvailabilityNumber(
  parkingSpace: ParkingSpace
) {
  if (parkingSpace.availability <= 0) {
    throw new Exception(parkingSpaceMessages.NO_AVAILABILITY);
  }

  const availability = parkingSpace.availability - 1;

  return availability;
}
