import mongoose, { Schema } from 'mongoose'

const commentSchema = new Schema({
  content: {
    type: String,
    maxlength: 300,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  organizationId: {
    type: Schema.Types.ObjectId,
  },
}, { timestamps: true })

const model = mongoose.model('Comment', commentSchema)

export default model