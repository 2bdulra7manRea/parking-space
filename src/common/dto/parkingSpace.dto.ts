/**
 *
 *  Data Transfer Object (DTO) pattern that can
 *  be used to map data from a request body to specific object properties
 *
 */

import { levelEnum} from "../enum/level";

export class ParkingSpaceDTO {
  constructor(
    public name: string,
    public rating: number,
    public category: string,
    public amenities: string,
    public image: string,
    public levelNum: number,
    public capacity: number,
    public availability: number,
    public location: { id: number },
    public manager: { id: number },
    public level?: levelEnum
  ) {}
}
