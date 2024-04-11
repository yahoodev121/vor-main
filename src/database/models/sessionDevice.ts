import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('sessionDevice');
  } catch (error) {
    // continue, because model doesn't exist
  }

  const SessionDeviceSchema = new Schema(
    {
      ip: {
        type: String,
        required: true,
      },
      hash: {
        type: String,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      geoIP: new Schema({
        range: [Number],
        country: String,
        region: String,
        eu: String,
        timezone: String,
        city: String,
        ll: [Number],
        metro: Number,
        area: Number,
      }),
      os: new Schema({
        name: String,
        short_name: String,
        version: String,
        platform: String,
        family: String,
      }),
      client: new Schema({
        type: String,
        name: String,
        short_name: String,
        version: String,
        engine: String,
        engine_version: String,
        family: String,
      }),
      device: new Schema({
        id: String,
        type: String,
        brand: String,
        model: String,
      }),
      sessions: [Date],
    },
    { timestamps: true },
  );

  SessionDeviceSchema.index(
    { ip: 1, hash: 1, user: 1 },
    {
      unique: true,
    },
  );

  SessionDeviceSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  SessionDeviceSchema.set('toJSON', {
    getters: true,
  });

  SessionDeviceSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'sessionDevice',
    SessionDeviceSchema,
  );
};
