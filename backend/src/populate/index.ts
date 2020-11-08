import dotenv from 'dotenv'
dotenv.config()

import example from './models/example'

const toBePopulatedFunctions = {
  example,
}

/**
 * Model
 */
import exampleModel from '@app/models/example/index'

/**
 * Interfaces
 */
import iExample from '@app/models/example/interface'

interface iPopulate {
  example: iExample[]
}

const toBePopulatedModels = {
  example: exampleModel,
}

const POPULATE_ORDER = ['example']
const alreadyPopulated: iPopulate = {
  example: [],
}

export default async function populate(): Promise<iPopulate> {
  for (const toBePopulateModelName of POPULATE_ORDER) {
    const functionToPopulate = toBePopulatedFunctions[toBePopulateModelName]
    const Model = toBePopulatedModels[toBePopulateModelName]
    await Model.deleteMany({})
    const docsPayload = functionToPopulate(alreadyPopulated)
    const docs = await Model.create(docsPayload)
    alreadyPopulated[toBePopulateModelName] = docs
  }

  return alreadyPopulated
}
