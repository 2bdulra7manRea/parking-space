import { DataSource } from "typeorm";
import { config } from "./index.config";
import { ParkingSpace } from "../entities/parkingSpace.entity";
import { Location } from "../entities/location.entity";
import { logger } from "./logger.config";
import { Manager } from "../entities/manager.entity";
import { ParkingReservation } from "../entities/parkingReservation.entity";

const AppDataSource = new DataSource({
  type: "mysql",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  entities: [ParkingSpace,ParkingReservation ,Location, Manager],
  synchronize: true,
  logging: false,
});


export const connectDatabase=()=> {
AppDataSource.initialize()
  .then(() => {
    logger.info("MySQL connected!");
  })
  .catch((err) => {
    logger.error("Failed to connect to db", err);
  });
}


export const disconnectDatabase=()=>{
  AppDataSource.destroy()  .then(() => {
    logger.info("MySQL disconnected!");
  })
  .catch((err) => {
    logger.error("Failed to  disconnect to db", err);
  });
}


export default AppDataSource;
