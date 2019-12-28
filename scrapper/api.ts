import { IExtractedInfo } from "./scrappedInfo";
import { logger } from "./logger";

export interface IApi {
  update(newElements: IExtractedInfo[]): void;
}

export class Api implements IApi {
  //TODO stub
  update(newElements: IExtractedInfo[]) {
    logger.log(newElements);
  }
}
