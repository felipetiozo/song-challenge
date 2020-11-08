import { Schema, Model, model } from 'mongoose'
import iChallenge, { iTask } from './interface'

const TaskSchema: Schema = new Schema<iTask>({
  subtitleMaskId: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
    enum: ['gap-filling', 'multiple-choice', 'blank-filling'],
  },

  values: {
    type: [String],
    required: false,
  },

  answer: {
    type: String,
    required: true,
  },
})

export const ChallengeSchema: Schema = new Schema<iChallenge>(
  {
    subtitle: {
      type: String,
      required: true,
    },

    tasks: {
      type: [TaskSchema],
      required: true,
    },

    track: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      album: {
        type: String,
        required: true,
      },
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
)

const ChallengeModel = model('challenge', ChallengeSchema) as Model<iChallenge>

export default ChallengeModel
