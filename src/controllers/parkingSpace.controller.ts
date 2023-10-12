import "reflect-metadata";
import { injectable } from "tsyringe";
import { ParkingSpaceService } from "../services/parkingSpace.service";
import { Request as Req, Response as Res } from "express";
import { Exception } from "../common/error/Exception";
import { STATUS_CODE } from "../common/enum/statusCode";
import { parkingSpaceMessages } from "../common/messages/parkingSpace";


@injectable()
export class ParkingSpaceController {
  constructor(private parkingSpaceService: ParkingSpaceService) {}

  async findParkingSpaceById(req: Req) {
    try {
      return await this.parkingSpaceService.findParkingSpaceById(
        parseInt(req.params.id)
      );
    } catch (error:any) {
      throw new Exception(parkingSpaceMessages.FAILED_TO_FIND_ITEM,STATUS_CODE.BAD_REQUEST,error?.message);
    }
  }

  async findAllParkingSpaceByManagerId(req: Req) {
    const { query } = req;
    const { managerId } = req.params;

    try {
      return await this.parkingSpaceService.findAllParkingSpaceByManagerId(
        parseInt(managerId),
        query
      );
    } catch (error:any) {
      throw new Exception(parkingSpaceMessages.FAILED_TO_FIND_ITEMS,STATUS_CODE.BAD_REQUEST,error?.message);
    }
  }

  async addNewParkingSpace(req: Req) {
    const { body } = req;
    try {
      return await this.parkingSpaceService.addNewParkingSpace(body);
    } catch (error:any) {
      throw new Exception(parkingSpaceMessages.FAILED_TO_ADD,STATUS_CODE.BAD_REQUEST,error?.message);
    }
  }

  async updateParkingSpace(req: Req) {
    const { body, params } = req;
    try {
      return await this.parkingSpaceService.updateParkingSpace(
        parseInt(params.id),
        parseInt(params.managerId),
        body
      );
    } catch (error:any) {
      throw new Exception(parkingSpaceMessages.FAILED_TO_UPDATE,STATUS_CODE.BAD_REQUEST,error?.message);
    }
  }

  async deleteParkingSpace(req: Req) {

    const {id , managerId} = req.params
    try {
      return await this.parkingSpaceService.deleteParkingSpace(
        parseInt(id),
        parseInt(managerId)
      );
    } catch (error:any) {
      throw new Exception(parkingSpaceMessages.FAILED_TO_DELETE,STATUS_CODE.BAD_REQUEST,error?.message);
    }
  }

  async bookParkingSpace(req: Req) {
    const { id } = req.params;
    try {
      return await this.parkingSpaceService.bookParkingSpace(parseInt(id));
    } catch (error:any) {
      throw new Exception(parkingSpaceMessages.FAILED_TO_BOOK,STATUS_CODE.BAD_REQUEST,error?.message);
    }
  }
}
