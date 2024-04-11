import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('reference');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ReferenceSchema = new Schema({
    entity: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 250,
    },
    reference: {
      type: Number,
      required: true,
      default: 0,
    },
    tenant: {
      type: Schema.Types.ObjectId,
      ref: 'tenant',
      default: null,
    },
  });

  ReferenceSchema.index(
    { entity: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        entity: { $type: 'string' },
      },
    },
  );

  ReferenceSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ReferenceSchema.set('toJSON', {
    getters: true,
  });

  ReferenceSchema.set('toObject', {
    getters: true,
  });

  return database.model('reference', ReferenceSchema);
};
