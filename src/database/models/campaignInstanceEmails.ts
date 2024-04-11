import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('campaignInstanceEmails');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const CampaignInstanceEmailsSchema = new Schema(
    {
      fromEmailAddress: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
      },
      toEmailAddress: {
        type: String,
      },
      ccEmailAddress: {
        type: String,
        minlength: 0,
        maxlength: 500,
      },
      sent: {
        type: Date,
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
        maxlength: 5000,
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

  CampaignInstanceEmailsSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  CampaignInstanceEmailsSchema.virtual('id').get(
    function () {
      // @ts-ignore
      return this._id.toHexString();
    },
  );

  CampaignInstanceEmailsSchema.set('toJSON', {
    getters: true,
  });

  CampaignInstanceEmailsSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'campaignInstanceEmails',
    CampaignInstanceEmailsSchema,
  );
};
