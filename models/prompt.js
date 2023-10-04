import { Schema, model, models } from 'mongoose'

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User', // reference to one user, one-to-many relationship, one user can create multiple prompts
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required!'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required!'],
  },
})

const Prompt = models.Prompt || model('Prompt', PromptSchema)

export default Prompt
