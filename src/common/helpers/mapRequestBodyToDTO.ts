
import { LocationDTO } from "../dto/location.dto";
import { ParkingSpaceDTO } from "../dto/parkingSpace.dto";

export function mapParkingSpaceRequestBodyToDTO(
  requestBody: any,
  locationId: number
) {
  const {
    name,
    rating,
    category,
    image,
    levelNum,
    availability,
    amenities,
    capacity,
    managerId
  } = requestBody;

  return new ParkingSpaceDTO(
    name,
    rating,
    category,
    amenities,
    image,
    levelNum,
    capacity,
    availability,
    { id: locationId },
    {id:managerId}
  );
}

export function mapLocationRequestBodyToDTO(requestBody: any) {
  const { city, state, country, zipCode, address } = requestBody;
  return new LocationDTO(city, state, country, zipCode, address);
}
