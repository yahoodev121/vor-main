import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('programRequirement');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProgramRequirementSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 300,
      },
      description: {
        type: String,
        maxlength: 1000,
      },
      requirementID: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 15,
      },
      programs: [
        {
          type: Schema.Types.ObjectId,
          ref: 'program',
          required: true,
        },
      ],
      controls: [
        {
          type: Schema.Types.ObjectId,
          ref: 'programControl',
          required: true,
        },
      ],
      notes: [
        {
          type: Schema.Types.ObjectId,
          ref: 'note',
          max: 50,
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

  ProgramRequirementSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ProgramRequirementSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ProgramRequirementSchema.set('toJSON', {
    getters: true,
  });

  ProgramRequirementSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'programRequirement',
    ProgramRequirementSchema,
  );
};
