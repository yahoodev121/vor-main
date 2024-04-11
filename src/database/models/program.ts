import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('program');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProgramSchema = new Schema(
    {
      reference: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
      },
      description: {
        type: String,
        maxlength: 250,
      },
      status: {
        type: String,
        enum: [
          'Healthy',
          'AtRisk',
          'NonCompliance',
          'NoTasks',
        ],
      },
      notes: [
        {
          type: Schema.Types.ObjectId,
          ref: 'note',
          max: 50,
        },
      ],
      requirements: [
        {
          type: Schema.Types.ObjectId,
          ref: 'programRequirement',
        },
      ],
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

  ProgramSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ProgramSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ProgramSchema.set('toJSON', {
    getters: true,
  });

  ProgramSchema.set('toObject', {
    getters: true,
  });

  return database.model('program', ProgramSchema);
};
