import dotenv from 'dotenv'
dotenv.config()

import populate from './index'
import { load, app } from '@app/app'

async function populateCLI() {
  const steps = ['mongo']
  await load(steps)

  await populate()
  app.mongo.disconnect()
}

populateCLI()
