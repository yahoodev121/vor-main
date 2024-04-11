import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('userGroup');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const UserGroupSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200,
      },
      description: {
        type: String,
        maxlength: 250,
      },
      type: {
        type: String,
        required: true,
        enum: ['Default', 'Office', 'LineOfBusiness'],
      },
      users: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
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

  UserGroupSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  UserGroupSchema.index(
    { name: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        name: { $type: 'string' },
      },
    },
  );

  UserGroupSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  UserGroupSchema.set('toJSON', {
    getters: true,
  });

  UserGroupSchema.set('toObject', {
    getters: true,
  });

  return database.model('userGroup', UserGroupSchema);
};
