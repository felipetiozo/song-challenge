import dotenv from 'dotenv'
dotenv.config()

import { load } from '@app/app'
const steps = ['mongo', 'express', 'api.general', 'lift']

async function init() {
  await load(steps)
}

init()
