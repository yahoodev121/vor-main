import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('emailTemplate');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const EmailTemplateSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
      },
      fromEmailAddress: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
      },
      subject: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200,
      },
      body: {
        type: String,
        required: true,
        minlength: 1,
        // maxlength: 5000,
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

  EmailTemplateSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  EmailTemplateSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  EmailTemplateSchema.set('toJSON', {
    getters: true,
  });

  EmailTemplateSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'emailTemplate',
    EmailTemplateSchema,
  );
};
