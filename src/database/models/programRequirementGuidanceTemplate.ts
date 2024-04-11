import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model(
      'programRequirementGuidanceTemplate',
    );
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProgramRequirementGuidanceTemplateSchema =
    new Schema(
      {
        name: {
          type: String,
          required: true,
          minlength: 1,
          maxlength: 100,
        },
        description: {
          type: String,
          required: true,
          minlength: 1,
          maxlength: 500,
        },
        requirementTemplates: [
          {
            type: Schema.Types.ObjectId,
            ref: 'programRequirementTemplate',
            required: true,
          },
        ],
        productCategories: [
          {
            type: Schema.Types.ObjectId,
            ref: 'productCategory',
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

  ProgramRequirementGuidanceTemplateSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ProgramRequirementGuidanceTemplateSchema.virtual(
    'id',
  ).get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ProgramRequirementGuidanceTemplateSchema.set('toJSON', {
    getters: true,
  });

  ProgramRequirementGuidanceTemplateSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'programRequirementGuidanceTemplate',
    ProgramRequirementGuidanceTemplateSchema,
  );
};
