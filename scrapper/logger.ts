import { config } from "./configuration";

export const logger = {
  log: (...args: any[]) => config.writeLogs && console.log(...args),
  error: (...args: any[]) => config.writeLogs && console.error(...args)
};
