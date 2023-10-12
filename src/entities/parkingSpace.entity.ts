import "reflect-metadata";
import {
  IsAlpha,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  Length,
  Max,
  Min,
  Validate,
} from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Location } from "./location.entity";
import { NotAllowedWordsValidator } from "../validations/parkingSpaceNames.validator";
import { levelEnum} from "../common/enum/level";
import { AllowedWordsValidator } from "../validations/parkingSpaceCategory.validator";
import { CATEGORIES_PARKING_SPACE } from "../common/constants/constants";
import { Manager } from "./manager.entity";

@Entity({ name: "parking_space" })
export class ParkingSpace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsString()
  @Length(11, 200, { message: "Name length must be longer than 10 characters" })
  @IsNotEmpty()
  @Validate(NotAllowedWordsValidator)
  name: string;

  @Column({ nullable: true })
  @IsString()
  amenities: string;

  @Column({ type: "int" })
  @IsInt()
  @Max(5)
  @Min(0)
  @IsNotEmpty()
  rating: number;

  @Column({
    type: "enum",
    nullable: false,
    enum: CATEGORIES_PARKING_SPACE,
  })
  @IsNotEmpty()
  @IsAlpha()
  @Validate(AllowedWordsValidator)
  category: string;

  @Column()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @Column({ type: "int", nullable: false })
  @IsNotEmpty()
  capacity: number;

  @Column({ type: "int", nullable: false })
  @IsNotEmpty()
  availability: number;

  @Column({
    type: "enum",
    enum: levelEnum,
  })
  level: string;

  @Column({ type: "int", nullable: false })
  @IsInt()
  @Max(1000)
  @IsNotEmpty()
  @Min(0)
  levelNum: number;

  @OneToOne(() => Location, (location) => location.parkingSpace, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn()
  location: Location;


  @ManyToOne(() => Manager, (manager) => manager.parkingSpace, {
    nullable: false,
  })
  @JoinColumn()
  manager: Manager;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
