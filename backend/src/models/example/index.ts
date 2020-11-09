import { Schema, Model, model } from 'mongoose'
import iExample from './interface'

export const ExampleSchema: Schema = new Schema<iExample>(
  {
    key: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
)

const ExampleModel = model('example', ExampleSchema) as Model<iExample>

export default ExampleModel
