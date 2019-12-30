"use strict";

import { config } from "./configuration";
import { IApi } from "./api";
import { logger } from "./logger";
import { get, curry, has } from "lodash";
import {
  flow,
  toArray,
  map,
  filter,
  compact,
  eq,
  get as fpget
} from "lodash/fp";
import { IExtractedInfo } from "./scrapped_info";

export interface IScrapper {
  performScrapping(): void;
}

interface IStorage {
  [id: string]: IExtractedInfo;
}

export class Scrapper implements IScrapper {
  private api: IApi;
  private storage: IStorage = {};

  constructor(api: IApi) {
    this.api = api;
  }

  private static getElementsToScrap(): HTMLCollection {
    const root = document.querySelector("div[class*='items-root-'");
    if (!root) {
      throw new Error("Root element not found");
    }
    logger.log({ root });

    const children = get(root, "children", new HTMLCollection());
    return children;
  }

  private static convertPropsToJson(props: Object): IExtractedInfo {
    return {
      id: get(props, "id"),
      title: get(props, "title"),
      address: get(props, "title"),
      pricePure: get(props, "pricePure"),
      coords: get(props, "coords")
    } as IExtractedInfo;
  }

  private static extractChildInfo(el: Element): IExtractedInfo {
    return flow([
      fpget(["__reactEventHandlers", "children", "props"]),
      this.convertPropsToJson
    ])(el);
  }

  private static getNewItems(storage: IStorage): IExtractedInfo[] {
    const extractInfo = map(this.extractChildInfo);
    const inStorage = curry(has)(storage);
    const notInStorage = flow([inStorage, eq(false)]);
    const filterNotInStorage = filter(notInStorage);
    return flow([toArray, extractInfo, compact, filterNotInStorage])(
      this.getElementsToScrap()
    );
  }

  performScrapping() {
    if (!config.enabled) {
      logger.log("Scrapper is disabled.");
      return;
    }

    try {
      const newElements = Scrapper.getNewItems(this.storage);
      this.api.update(newElements);
      logger.log("New elements was sent to server", newElements);
    } catch (err) {
      logger.error("Error occured while scrapping elements", err);
    }
  }
}
