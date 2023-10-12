import { FindManyOptions } from "typeorm";
import { ParkingSpace } from "../../entities/parkingSpace.entity";
import { ObjectBuilder } from "../designs/objectBuilder";

// it needs more refactoring


function where(query: any) {
  const filter = new ObjectBuilder();
  filter.addProperty(
    "rating",
    query.rating ? parseInt(query.rating) : undefined
  );
  filter.addProperty("level", query.level);

  const relationsWhereLocation = new ObjectBuilder();
  relationsWhereLocation.addProperty("city", query.city);
  filter.addProperty("location", relationsWhereLocation.build());

  const relationsWheremanager = new ObjectBuilder();
  relationsWheremanager.addProperty("id", query.managerId);
  filter.addProperty("manager", relationsWheremanager.build());

  return filter.build();
}

function relations(names: string[]) {
  const filter = new ObjectBuilder();
  names.forEach((tableName) => {
    filter.addProperty(tableName, true);
  });
  return filter.build();
}

export function filterQueryParkingSpaceList(
  query: any
): FindManyOptions<ParkingSpace> {
  const findManyOptions = new ObjectBuilder();
  findManyOptions.addProperty(
    "skip",
    query.offset ? parseInt(query.offset) : 0
  );
  findManyOptions.addProperty("take", query.limit ? parseInt(query.limit) : 5);
  findManyOptions.addProperty("where", where(query));
  findManyOptions.addProperty("relations", relations(["location", "manager"]));
  return findManyOptions.build();
}
