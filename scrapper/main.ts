import { Api } from "./api";
import { Scrapper } from "./scrapper";
import { Updater } from "./updater";

const api = new Api();
const scrapper = new Scrapper(api);
const updater = new Updater(scrapper);

updater.startUpdates();
