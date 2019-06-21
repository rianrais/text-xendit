import mongoose, { Schema } from 'mongoose'

const organizationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true })

const model = mongoose.model('Organization', organizationSchema)

export default model