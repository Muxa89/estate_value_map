"use strict";

import { IScrapper } from "./scrapper";
import { config } from "./configuration";

export class Updater {
  private updateInterval: any;
  private scrapper: IScrapper;

  constructor(scrapper: IScrapper) {
    this.scrapper = scrapper;
  }

  startUpdates() {
    this.scrapper.performScrapping();
    this.updateInterval = setInterval(
      this.scrapper.performScrapping,
      config.timeout
    );
  }

  stopUpdates() {
    clearInterval(this.updateInterval);
  }
}
