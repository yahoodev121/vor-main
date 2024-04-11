import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const QuestionnaireSchema = new Schema({
  sections: Schema.Types.Array,
  questions: Schema.Types.Mixed,
});

QuestionnaireSchema.virtual('id').get(function () {
  // @ts-ignore
  return this._id.toHexString();
});

QuestionnaireSchema.set('toJSON', {
  getters: true,
});

QuestionnaireSchema.set('toObject', {
  getters: true,
});

export default QuestionnaireSchema;
