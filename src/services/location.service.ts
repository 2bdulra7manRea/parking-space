import { injectable } from "tsyringe";
import { LocationRepository } from "../repositories/location.repository";
import { InsertResult } from "typeorm";
import { mapLocationRequestBodyToDTO } from "../common/helpers/mapRequestBodyToDTO";

@injectable()
export class LocationService {
  constructor(private locationRepository: LocationRepository) {}

  createNewLocation(locationBody: any): Promise<InsertResult> {
    const mappedRequestBodyToDTO = mapLocationRequestBodyToDTO(locationBody);
    return this.locationRepository.create(mappedRequestBodyToDTO);
  }

  updateLocation(body: any, id: number) {
    return this.locationRepository.update(body, id);
  }

  deleteLocation(id: number) {
    return this.locationRepository.delete({ id: id });
  }
}
