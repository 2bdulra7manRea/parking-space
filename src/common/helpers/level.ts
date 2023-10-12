import {
  levelEnum,
  levelNumberEnum,
} from "../enum/level";

/**
 *
 * @param levelNum
 * @returns
 */

export function calculateLevelValue(
  levelNum: number
): levelEnum {
  if (levelNum <= levelNumberEnum.SOLVER) {
    return levelEnum.SILVER;
  } else if (levelNum <= levelNumberEnum.BRONZE) {
    return levelEnum.BRONZE;
  } else {
    return levelEnum.GOLD;
  }
}
