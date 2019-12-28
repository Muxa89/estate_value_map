"use strict";

import { config } from "./configuration";
import { IApi } from "./api";
import { logger } from "./logger";
import { get } from "lodash";
import { IExtractedInfo } from "./scrappedInfo";

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

  private getRoot(): HTMLScriptElement | undefined {
    const elements: HTMLScriptElement[] = <HTMLScriptElement[]>(
      (<any>document.querySelector("div[class*='items-root-'"))
    );
    return (elements && elements.length > 0 && elements[0]) || undefined;
  }

  private getElementsToScrap(): HTMLScriptElement[] {
    const root = this.getRoot();
    logger.log("Root element", root);

    if (!root) {
      return;
    }

    const children: HTMLScriptElement[] = get(root, "children", undefined);
    logger.log("Children", children);
    return children || [];
  }

  private convertPropsToJson(props: Object): IExtractedInfo {
    return {
      id: get(props, "id"),
      title: get(props, "title"),
      address: get(props, "title"),
      pricePure: get(props, "pricePure"),
      coords: get(props, "coords")
    } as IExtractedInfo;
  }

  private extractChildInfo(el: Element): IExtractedInfo | undefined {
    const props = get(
      el,
      ["__reactEventHandlers", "children", "props"],
      undefined
    );

    return props && this.convertPropsToJson(props);
  }

  performScrapping() {
    if (!config.enabled) {
      logger.log("Scrapper disabled.");
      return;
    }

    const elementsToScrap = this.getElementsToScrap();

    const extractedInfo = elementsToScrap
      .map(this.extractChildInfo)
      .filter(el => el !== undefined);

    const newElements: IExtractedInfo[] = extractedInfo.filter(
      info => !(info.id in this.storage)
    );
    logger.log("New elements", newElements);

    this.api.update(newElements);
  }
}
