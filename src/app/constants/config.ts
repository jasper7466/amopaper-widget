interface IConfig {
  crmJsonStorageFieldName: string;
  crmJsonStorageLengthLimit: number;
  crmJsonStoragePollingInterval: number;
  nopaperStatusPollingInterval: number;
}

export const config: Readonly<IConfig> = {
  crmJsonStorageFieldName: 'nopaperJsonStorage',
  crmJsonStorageLengthLimit: 10000,
  crmJsonStoragePollingInterval: 5000,
  nopaperStatusPollingInterval: 7000,
};
