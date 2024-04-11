import { IRepositoryOptions } from './IRepositoryOptions';
import MongooseRepository from './mongooseRepository';
import Reference from '../models/reference';

class ReferenceRepository {
  static async getNextReference(
    entity,
    options: IRepositoryOptions,
    ignoreTenant = false,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record = await Reference(
      options.database,
    ).findOneAndUpdate(
      {
        entity: entity(options.database).modelName,
        tenant: ignoreTenant ? null : currentTenant.id,
      },
      {
        $inc: {
          reference: 1,
        },
      },
      {
        new: true,
        upsert: true,
      },
    );

    return record.reference;
  }
}

export default ReferenceRepository;
