import {
  EntityTarget,
  FindManyOptions,
  InsertResult,
  ObjectLiteral,
  Repository,
} from "typeorm";
import AppDataSource from "../configs/dataSource.config";

export abstract class RepositoryApplication<T extends ObjectLiteral> {
   repository: Repository<T>;

  constructor(entity: EntityTarget<T>) {
    this.repository = AppDataSource.getRepository(entity);
  }

async create(entity: any): Promise<InsertResult> {
    return this.repository.save(entity)
   }

  async update(updated: any, id: number): Promise<any> {
    return this.repository.update(id, updated);
  }

  async findAll(options?: FindManyOptions<T> | undefined): Promise<T[]> {
    return this.repository.find(options);
  }

  async delete(filter:any) {
    return this.repository.delete(filter);
  }

}
