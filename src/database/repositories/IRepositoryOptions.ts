export interface IRepositoryOptions {
  language: string;
  database: any;
  currentUser?: any;
  currentTenant?: any;
  session?: any;
  bypassPermissionValidation?: any;
  activeDevice: string;
  ip: string;
  clientIP: string;
  geoIP: {
    range: number[];
    country: string;
    region: string;
    eu: string;
    timezone: string;
    city: string;
    ll: number[];
    metro: number;
    area: number;
  };
  useragent: string;
  device: {
    os: {
      name: string;
      short_name: string;
      version: string;
      platform: string;
      family: string;
    };
    client: {
      type: string;
      name: string;
      short_name: string;
      version: string;
      engine: string;
      engine_version: string;
      family: string;
    };
    device: {
      id: string;
      type: string;
      brand: string;
      model: string;
    };
  };
  bot: any;
}

export const emptyRepositoryOptions = (
  options?,
): IRepositoryOptions => ({
  language: '',
  database: undefined,
  activeDevice: '',
  ip: '',
  clientIP: '',
  geoIP: {
    range: [],
    country: '',
    region: '',
    eu: '',
    timezone: '',
    city: '',
    ll: [],
    metro: 0,
    area: 0,
  },
  useragent: '',
  device: {
    os: {
      name: '',
      short_name: '',
      version: '',
      platform: '',
      family: '',
    },
    client: {
      type: '',
      name: '',
      short_name: '',
      version: '',
      engine: '',
      engine_version: '',
      family: '',
    },
    device: {
      id: '',
      type: '',
      brand: '',
      model: '',
    },
  },
  bot: undefined,
  ...options,
});
