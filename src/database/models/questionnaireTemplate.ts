import mongoose from 'mongoose';
import QuestionnaireSchema from './schemas/questionnareSchema';

const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('questionnaireTemplate');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const QuestionnaireTemplateSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
      },
      totalQuestions: {
        type: Number,
        required: true,
        min: 0,
      },
      questionnaire: QuestionnaireSchema,
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

  QuestionnaireTemplateSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  QuestionnaireTemplateSchema.virtual('id').get(
    function () {
      // @ts-ignore
      return this._id.toHexString();
    },
  );

  QuestionnaireTemplateSchema.set('toJSON', {
    getters: true,
  });

  QuestionnaireTemplateSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'questionnaireTemplate',
    QuestionnaireTemplateSchema,
  );
};
