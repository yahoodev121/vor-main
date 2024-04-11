import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('qaLibrary');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const QALibrarySchema = new Schema(
    {
      question: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,
      },
      answer: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,
      },
      aiKnowledgebase: {
        type: Boolean,
        required: true,
      },
      expirationDate: {
        type: Date,
        required: true
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

  QALibrarySchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  QALibrarySchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  QALibrarySchema.set('toJSON', {
    getters: true,
  });

  QALibrarySchema.set('toObject', {
    getters: true,
  });

  return database.model('qaLibrary', QALibrarySchema);
};
