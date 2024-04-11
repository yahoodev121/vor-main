import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('highlight');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const HighlightSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500,
      },
      file: {
        type: Schema.Types.ObjectId,
        ref: 'file',
      },
      source: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000,
      },
      description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 2500,
      },
      annotations: {
        type: Schema.Types.Mixed,
      },
      client: {
        type: Schema.Types.ObjectId,
        ref: 'client',
      },
      vendor: {
        type: Schema.Types.ObjectId,
        ref: 'vendor',
      },
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      importHash: { type: String },
    },
    { timestamps: true },
  );

  HighlightSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  HighlightSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  HighlightSchema.set('toJSON', {
    getters: true,
  });

  HighlightSchema.set('toObject', {
    getters: true,
  });

  return database.model('highlight', HighlightSchema);
};
