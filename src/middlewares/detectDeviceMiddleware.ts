import DeviceDetector from 'node-device-detector';
import geoIP from 'geoip-lite';
import SessionDeviceRepository from '../database/repositories/sessionDeviceRepository';

const ipv4RE = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/;

const filterIPv4 = (ip) => {
  if (ipv4RE.test(ip)) {
    const result = ipv4RE.exec(ip);
    if (result) {
      return result[0];
    }
  }
  return ip;
};

const deviceDetector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  deviceAliasCode: false,
});

export async function detectDeviceMiddleware(
  req,
  res,
  next,
) {
  try {
    const useragent = req.headers['user-agent'];

    req.useragent = useragent;
    req.device = deviceDetector.detect(useragent);
    req.bot = deviceDetector.parseBot(useragent);

    req.clientIP = filterIPv4(req.ip);
    req.geoIP = geoIP.lookup(req.clientIP);

    req.activeDevice =
      await SessionDeviceRepository.updateSessionDevice(
        req,
      );

    next();
  } catch (error) {
    next(error);
  }
}
