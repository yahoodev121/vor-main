import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('programRequirementTemplate');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProgramRequirementTemplateSchema = new Schema(
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
      programTemplates: [
        {
          type: Schema.Types.ObjectId,
          ref: 'programTemplate',
          required: true,
        },
      ],
      guidanceTemplates: [
        {
          type: Schema.Types.ObjectId,
          ref: 'programRequirementGuidanceTemplate',
          required: true,
        },
      ],
      controlTemplates: [
        {
          type: Schema.Types.ObjectId,
          ref: 'programControlTemplate',
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

  ProgramRequirementTemplateSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ProgramRequirementTemplateSchema.virtual('id').get(
    function () {
      // @ts-ignore
      return this._id.toHexString();
    },
  );

  ProgramRequirementTemplateSchema.set('toJSON', {
    getters: true,
  });

  ProgramRequirementTemplateSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'programRequirementTemplate',
    ProgramRequirementTemplateSchema,
  );
};
