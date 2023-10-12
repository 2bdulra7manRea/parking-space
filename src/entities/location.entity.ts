import { IsInt, IsNotEmpty, IsString, Validate } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ParkingSpace } from "./parkingSpace.entity";
import { LengthNumberValidator } from "../validations/locationZipCode";

@Entity({ name: "location" })
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  city: string;

  @Column()
  @IsString()
  state: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  country: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  address: string;

  @Column({ type: "int" })
  @IsInt()
  @IsNotEmpty()
  @Validate(LengthNumberValidator)
  zipCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => ParkingSpace, (parkingSpace) => parkingSpace.location, {
    onDelete: "CASCADE",
  })
  parkingSpace: ParkingSpace;
}
