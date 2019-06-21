import mongoose, { Schema } from 'mongoose'

const memberSchema = new Schema({
  loginName: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 20,
  },
  avatarUrl: {
    type: String,
    default: '',
  },
  followersAmount: {
    type: Number,
    default: 0,
  },
  followingAmount: {
    type: Number,
    default: 0,
  },
  organizationId: {
    type: Schema.Types.ObjectId,
  },
}, { timestamps: true })

const model = mongoose.model('Member', memberSchema)

export default model