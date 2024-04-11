import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('projectStatus');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProjectStatusSchema = new Schema(
    {
      status: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
      },
      system: {
        type: Boolean,
        required: true,
      },
      order: {
        type: Number,
        required: true,
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

  ProjectStatusSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ProjectStatusSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ProjectStatusSchema.set('toJSON', {
    getters: true,
  });

  ProjectStatusSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'projectStatus',
    ProjectStatusSchema,
  );
};
