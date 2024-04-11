import EmailSchema from './schemas/emailSchema';
import mongoose from 'mongoose';
import QuestionnaireSchema from './schemas/questionnareSchema';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('campaign');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const CampaignSchema = new Schema(
    {
      reference: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
        enum: ['Questionnaire', 'Email'],
      },
      audience: {
        type: String,
        required: true,
        enum: ['Vendors', 'Clients'],
      },
      name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
      },
      dueDate: {
        type: Date,
      },
      description: {
        type: String,
        minlength: 0,
        maxlength: 500,
      },
      questionnaireId: {
        type: Schema.Types.ObjectId,
        ref: 'questionnaireTemplate',
      },
      questionnaire: QuestionnaireSchema,
      status: {
        type: String,
        required: true,
        enum: ['Not Started', 'In Progress', 'Completed'],
      },
      progress: {
        type: Number,
        min: 0,
        max: 100,
      },
      totalRecipients: {
        type: Number,
        min: 1,
      },
      vendors: [
        {
          type: Schema.Types.ObjectId,
          ref: 'vendor',
        },
      ],
      clients: [
        {
          type: Schema.Types.ObjectId,
          ref: 'client',
        },
      ],
      emailTemplateId: {
        type: Schema.Types.ObjectId,
        ref: 'emailTemplate',
        // required: true,
      },
      emailTemplate: EmailSchema,

      useReminderEmailAfterCampaignEnrollment: {
        type: Boolean,
      },
      campaignEnrollmentEmailTemplate: {
        type: Schema.Types.ObjectId,
        ref: 'emailTemplate',
      },
      daysAfterCampaignEnrollment: {
        type: Number,
      },

      useRepeatReminderEmail: {
        type: Boolean,
      },
      repeatReminderEmailTemplate: {
        type: Schema.Types.ObjectId,
        ref: 'emailTemplate',
      },
      intervalDaysForRepeatReminderEmail: {
        type: Number,
      },

      useReminderEmailComingDue: {
        type: Boolean,
      },
      emailTemplateComingDue: {
        type: Schema.Types.ObjectId,
        ref: 'emailTemplate',
      },
      daysBeforeComingDue: {
        type: Number,
      },

      useReminderEmailOverdue: {
        type: Boolean,
      },
      emailTemplateOverdue: {
        type: Schema.Types.ObjectId,
        ref: 'emailTemplate',
      },
      daysAfterOverdue: {
        type: Number,
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

  CampaignSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  CampaignSchema.index(
    { name: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        name: { $type: 'string' },
      },
    },
  );

  CampaignSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  CampaignSchema.set('toJSON', {
    getters: true,
  });

  CampaignSchema.set('toObject', {
    getters: true,
  });

  return database.model('campaign', CampaignSchema);
};
