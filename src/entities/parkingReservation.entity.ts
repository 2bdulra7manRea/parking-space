import { IsNotEmpty, IsString} from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ParkingSpace } from "./parkingSpace.entity";


@Entity({ name: "parking_reservation" })
export class ParkingReservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  status: string;

  @Column()
  reservationDate:Date

  @Column()
  startTime:Date

  @Column()
  endTime:Date

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @JoinColumn()
  @OneToOne(() => ParkingSpace, {
    onDelete: "CASCADE",
  })
  parkingSpace: ParkingSpace;
}
