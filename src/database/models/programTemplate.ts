import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('programTemplate');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProgramTemplateSchema = new Schema(
    {
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
      requirementTemplates: [
        {
          type: Schema.Types.ObjectId,
          ref: 'programRequirementTemplate',
          required: true,
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

  ProgramTemplateSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ProgramTemplateSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ProgramTemplateSchema.set('toJSON', {
    getters: true,
  });

  ProgramTemplateSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'programTemplate',
    ProgramTemplateSchema,
  );
};