import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('programControl');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProgramControlSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 300,
      },
      description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000,
      },
      tasks: [
        {
          type: Schema.Types.ObjectId,
          ref: 'task',
        },
      ],
      requirements: [
        {
          type: Schema.Types.ObjectId,
          ref: 'programRequirement',
        },
      ],
      notes: [
        {
          type: Schema.Types.ObjectId,
          ref: 'note',
          max: 50,
        },
      ],
      attachments: [
        {
          type: Schema.Types.ObjectId,
          ref: 'file',
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

  ProgramControlSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ProgramControlSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ProgramControlSchema.set('toJSON', {
    getters: true,
  });

  ProgramControlSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'programControl',
    ProgramControlSchema,
  );
};
