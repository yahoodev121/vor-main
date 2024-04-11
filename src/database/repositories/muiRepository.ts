import { IRepositoryOptions } from './IRepositoryOptions';
import MongooseRepository from './mongooseRepository';
import MUI from '../models/mui';

export default class MuiRepository {
  static DEFAULT_SETTINGS = {
    miniSidenav: false,
    transparentSidenav: false,
    whiteSidenav: false,
    sidenavColor: 'info',
    transparentNavbar: true,
    fixedNavbar: true,
    direction: 'ltr',
    darkMode: false,
    viewModes: [],
  };

  static async findOrCreateDefault(
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const first =
      await MongooseRepository.wrapWithSessionIfExists(
        MUI(options.database).findOne({
          user: currentUser.id,
        }),
        options,
      );

    if (first) {
      return first;
    }

    return await MuiRepository.save(
      MuiRepository.DEFAULT_SETTINGS,
      options,
    );
  }

  static async save(data, options: IRepositoryOptions) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const record = await MUI(
      options.database,
    ).findOneAndUpdate(
      {
        user: currentUser.id,
      },
      data,
      {
        new: true,
        upsert: true,
      },
    );

    return record;
  }
}
