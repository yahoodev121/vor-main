export interface IServiceOptions {
  language: string;
  currentUser: any;
  currentTenant: any;
  database: any;
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
