import { container } from "tsyringe";
import { ParkingSpaceService } from "../services/parkingSpace.service";
import { ParkingSpaceRepository } from "../repositories/parkingSpace.repository";
import { LocationRepository } from "../repositories/location.repository";
import { LocationService } from "../services/location.service";
import { ManagerRepository } from "../repositories/manager.repository";
import { ManagerService } from "../services/manager.service";

container.register(ParkingSpaceService, { useClass: ParkingSpaceService });
container.register(ParkingSpaceRepository, {
  useClass: ParkingSpaceRepository,
});
container.register(LocationRepository, { useClass: LocationRepository });
container.register(LocationService, { useClass: LocationService });

container.register(ManagerRepository, { useClass: ManagerRepository });

container.register(ManagerService, { useClass: ManagerService });

export const dependencyContainer = container;
