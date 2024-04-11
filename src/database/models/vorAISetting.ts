import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('vorAISetting');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const VorAISettingSchema = new Schema(
    {
      apiBearerToken: {
        type: Schema.Types.String,
        required: true,
        max: 200,
        min: 1,
      },
      engine: {
        type: Schema.Types.String,
        required: true,
      },
      frequencyPenalty: {
        type: Schema.Types.Number,
        max: 2,
      },
      maxTokens: {
        type: Schema.Types.Number,
        max: 4000,
      },
      presencePenalty: {
        type: Schema.Types.Number,
        max: 2,
      },
      prompt: {
        type: Schema.Types.String,
      },
      stopSequence: {
        type: Schema.Types.String,
      },
      temperature: {
        type: Schema.Types.Number,
        max: 1,
      },
      topP: {
        type: Schema.Types.Number,
        max: 1,
      },
      attachments: [
        {
          type: Schema.Types.ObjectId,
          ref: 'file',
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
    },
    { timestamps: true },
  );

  VorAISettingSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  VorAISettingSchema.set('toJSON', {
    getters: true,
  });

  VorAISettingSchema.set('toObject', {
    getters: true,
  });

  return database.model('vorAISetting', VorAISettingSchema);
};
