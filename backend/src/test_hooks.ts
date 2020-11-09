import dotenv from 'dotenv'
dotenv.config()

import { load, app } from '@app/app'
const steps = ['mongo']

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const exports: any
exports.mochaHooks = {
  async beforeAll() {
    process.env.NODE_ENV = 'test'
    await load(steps)
  },
  async afterAll() {
    await app.mongo.disconnect()
  },
}
