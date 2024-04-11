import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('programControlTemplate');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProgramControlTemplateSchema = new Schema(
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
      requirementTemplates: [
        {
          type: Schema.Types.ObjectId,
          ref: 'programRequirementTemplate',
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

  ProgramControlTemplateSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ProgramControlTemplateSchema.virtual('id').get(
    function () {
      // @ts-ignore
      return this._id.toHexString();
    },
  );

  ProgramControlTemplateSchema.set('toJSON', {
    getters: true,
  });

  ProgramControlTemplateSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'programControlTemplate',
    ProgramControlTemplateSchema,
  );
};
