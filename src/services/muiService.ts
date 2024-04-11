import MuiRepository from '../database/repositories/muiRepository';

class MuiService {
  static async findOrCreateDefault(options) {
    return await MuiRepository.findOrCreateDefault(options);
  }

  static async save(data, options) {
    return await MuiRepository.save(data, options);
  }
}

export default MuiService;
