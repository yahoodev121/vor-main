import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const emailTypes = [
  'primary',
  'support',
  'infoSec',
  'privacy',
];

const EmailSchema = new Schema({
  to: [
    {
      type: String,
      enum: emailTypes,
    },
  ],
  cc: [
    {
      type: String,
      enum: emailTypes,
    },
  ],
  bcc: [
    {
      type: String,
      enum: emailTypes,
    },
  ],
  fromEmailAddress: {
    type: String,
    minlength: 1,
    maxlength: 100,
  },
  subject: {
    type: String,
    minlength: 1,
    maxlength: 200,
  },
  body: {
    type: String,
    minlength: 1,
    // maxlength: 5000,
  },
  attachments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'file',
    },
  ],
});

EmailSchema.virtual('id').get(function () {
  // @ts-ignore
  return this._id.toHexString();
});

EmailSchema.set('toJSON', {
  getters: true,
});

EmailSchema.set('toObject', {
  getters: true,
});

export default EmailSchema;
