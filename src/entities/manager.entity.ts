import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ParkingSpace } from "./parkingSpace.entity";

@Entity({ name: "manager" })
export class Manager {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToMany(() => ParkingSpace, (parkingSpace) => parkingSpace.manager)
  parkingSpace: ParkingSpace[];
}
