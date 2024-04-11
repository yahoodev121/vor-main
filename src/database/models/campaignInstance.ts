import mongoose from 'mongoose';
import QuestionnaireSchema from './schemas/questionnareSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('campaignInstance');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const CampaignInstanceSchema = new Schema(
    {
      reference: {
        type: Number,
        required: true,
      },
      campaign: {
        type: Schema.Types.ObjectId,
        ref: 'campaign',
      },
      dueDate: {
        type: Date,
      },
      name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 250,
      },
      status: {
        type: String,
        required: true,
        enum: ['Not Started', 'In Progress', 'Completed'],
      },
      progress: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      score: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      questionnaire: QuestionnaireSchema,
      client: {
        type: Schema.Types.ObjectId,
        ref: 'client',
      },
      vendor: {
        type: Schema.Types.ObjectId,
        ref: 'vendor',
      },
      users: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      submittedDate: {
        type: Date,
      },
      submittedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
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

  CampaignInstanceSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  CampaignInstanceSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  CampaignInstanceSchema.set('toJSON', {
    getters: true,
  });

  CampaignInstanceSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'campaignInstance',
    CampaignInstanceSchema,
  );
};
