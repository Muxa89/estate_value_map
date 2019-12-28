export interface IScrapperConfiguration {
  enabled: boolean;
  sendUpdates: boolean;
  writeLogs: boolean;
  timeout: number;
}

export const config: IScrapperConfiguration = {
  enabled: true,
  sendUpdates: true,
  writeLogs: true,
  timeout: 5000
};