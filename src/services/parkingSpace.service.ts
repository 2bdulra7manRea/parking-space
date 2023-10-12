import { injectable } from "tsyringe";
import { ParkingSpaceRepository } from "../repositories/parkingSpace.repository";
import { Exception } from "../common/error/Exception";
import { parkingSpaceMessages } from "../common/messages/parkingSpace";
import { LocationService } from "./location.service";
import { filterQueryParkingSpaceList } from "../common/helpers/filterQueryParkingSpace";
import { mapParkingSpaceRequestBodyToDTO } from "../common/helpers/mapRequestBodyToDTO";
import { InsertResult } from "typeorm";
import { calculateLevelValue } from "../common/helpers/level";
import { decreaseParkingSpaceAvailabilityNumber } from "../common/helpers/parkingSpaceAvailability";

@injectable()
export class ParkingSpaceService {
  constructor(
    private parkingSpaceRepository: ParkingSpaceRepository,
    private locationService: LocationService
  ) {}

  async findParkingSpaceById(parkingSpaceId: number) {
    const parkingSpace = await this.parkingSpaceRepository.findOneById(
      parkingSpaceId
    );
    if (!parkingSpace) {
      throw new Exception(parkingSpaceMessages.NOT_FOUND);
    }

    return parkingSpace;
  }

  async findAllParkingSpaceByManagerId(managerId: number, filter: any) {
    const query = { ManagerId: managerId, ...filter };
    // builder pattern query builder
    const filterQuery = filterQueryParkingSpaceList(query);
    return await this.parkingSpaceRepository.findAll(filterQuery);
  }

  // using Transaction Script pattern

  async addNewParkingSpace(body: any) {
    let parkingSpace: InsertResult | undefined;
    let locationId: number | undefined;
    try {
      const result = await this.locationService.createNewLocation(
        body.location
      );

      locationId = result.identifiers[0].id;
      if (!locationId) {
        throw new Exception(parkingSpaceMessages.Failed_TO_ADD_LOCATION);
      }

      const mappedRequestBodyToDTO = mapParkingSpaceRequestBodyToDTO(
        body,
        locationId
      );
      mappedRequestBodyToDTO.level = calculateLevelValue(
        mappedRequestBodyToDTO.levelNum
      );
      parkingSpace = await this.parkingSpaceRepository.create(
        mappedRequestBodyToDTO
      );
      return parkingSpace;
    } catch (error: any) {
      if (parkingSpace) {
        await this.deleteParkingSpace(
          parkingSpace?.identifiers[0].id,
          body.ManagerId
        );
      }
      if (locationId) {
        await this.locationService.deleteLocation(locationId);
      }
      throw new Exception(error?.message);
    }
  }

  async deleteParkingSpace(parkingSpaceId: number, managerId: number) {
    const parkingSpace = await this.findParkingSpaceById(parkingSpaceId);
    const result = await this.parkingSpaceRepository.delete({
      id: parkingSpaceId,
      manager: {
        id: managerId,
      },
    });

    // for time being in case no database migration implemented

    if (parkingSpace?.location?.id) {
      await this.locationService.deleteLocation(parkingSpace.location.id);
    }

    return result;
  }

  async updateParkingSpace(
    parkingSpaceId: number,
    managerId: number,
    updated: any
  ) {
    const { level, location, ...rest } = updated;

    if (typeof level !== "undefined") {
      throw new Exception(parkingSpaceMessages.NOT_ALLOWED_TO_UPDATE);
    }

    if (typeof updated.levelNum !== "undefined") {
      updated.level = calculateLevelValue(
        updated.levelNum
      );
    }

    if (location) {
      const parkingSpace = await this.findParkingSpaceById(parkingSpaceId);
      if (parkingSpace) {
        await this.locationService.updateLocation(
          location,
          parkingSpace.location.id
        );
      }
    }

    if (!Object.values(rest).length) {
      return { location: "updated" };
    }

    const result = await this.parkingSpaceRepository.update(rest, {
      id: parkingSpaceId,
      manager: { id: managerId },
    });

    return result;
  }

  async bookParkingSpace(parkingSpaceId: number) {
    const parkingSpace = await this.parkingSpaceRepository.findOneById(
      parkingSpaceId
    );

    if (!parkingSpace) {
      throw new Exception(parkingSpaceMessages.NOT_FOUND);
    }

    const availabilityAfterDecreasing =
      decreaseParkingSpaceAvailabilityNumber(parkingSpace);

    return await this.parkingSpaceRepository.update(
      { availability: availabilityAfterDecreasing },
      { id: parkingSpaceId }
    );
  }
}
