import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('project');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProjectSchema = new Schema(
    {
      reference: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      description: {
        type: String,
        maxlength: 1000,
      },
      status: {
        type: Schema.Types.ObjectId,
        ref: 'projectStatus',
        required: true,
      },
      type: {
        type: Schema.Types.ObjectId,
        ref: 'projectType',
        required: true,
      },
      priority: {
        type: Schema.Types.ObjectId,
        ref: 'projectPriority',
        required: true,
      },
      dueDate: {
        type: Date,
        required: true,
      },
      completedDate: {
        type: Date,
      },
      teamMembers: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      teamGroups: [
        {
          type: Schema.Types.ObjectId,
          ref: 'userGroup',
          max: 5,
        },
      ],
      tasks: [
        {
          type: Schema.Types.ObjectId,
          ref: 'task',
        },
      ],
      risks: [
        {
          type: Schema.Types.ObjectId,
          ref: 'risk',
        },
      ],
      notes: [
        {
          type: Schema.Types.ObjectId,
          ref: 'note',
          max: 1000,
        },
      ],
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
      importHash: { type: String },
    },
    { timestamps: true },
  );

  ProjectSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ProjectSchema.index(
    { reference: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        reference: { $type: 'number' },
      },
    },
  );

  ProjectSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ProjectSchema.set('toJSON', {
    getters: true,
  });

  ProjectSchema.set('toObject', {
    getters: true,
  });

  return database.model('project', ProjectSchema);
};
