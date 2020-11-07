import App from './types/App'
import AppSteps from './types/AppSteps'

import chalk from 'chalk'

import liftStep from './setup/lift'
import mongoStep from './setup/mongo'
import expressStep from './setup/express'

import apiGeneral from './setup/api.general'

const setupSteps: AppSteps = {
  mongo: mongoStep as typeof mongoStep,
  express: expressStep as typeof expressStep,
  'api.general': apiGeneral as typeof apiGeneral,
  lift: liftStep as never,
}

const app: App = {}

async function load(requiredSteps = []) {
  console.log()
  console.log('[server]', chalk.dim('lifting...'))

  const steps = Object.entries(setupSteps)
  const stepsCount = Object.keys(setupSteps).filter((step: string) =>
    requiredSteps.includes(step)
  ).length

  const liftStartedAt = new Date()
  let stepCount = 1
  console.log(chalk.dim('--'))
  for (const step of steps) {
    const stepSetupStartedAt = new Date()
    const stepName = step[0]
    const stepSetup = step[1]

    if (!requiredSteps.includes(stepName)) continue

    try {
      const stepResult = await stepSetup(app)

      if (stepResult) {
        app[stepName as keyof App] = stepResult
      }
      const stepSetupFinishedAt = new Date()
      console.log(
        chalk.blue.inverse(`[${stepCount++}/${stepsCount}]`),
        chalk.blue(stepName),
        chalk.dim(`: ${+stepSetupFinishedAt - +stepSetupStartedAt}ms`)
      )
    } catch (err) {
      console.log(err)
      console.log(
        chalk.white('[app] setup:'),
        chalk.red(stepName),
        chalk.dim(': failed')
      )
      process.exit(1)
    }
  }
  console.log(chalk.dim('--'))

  const liftFinishedAt = new Date()
  if (app.express) {
    console.log(
      chalk.white('[server] port:'),
      chalk.blue(app.express.settings.port)
    )
  }

  if (app.mongo) {
    console.log(
      chalk.white('[server] mongo:'),
      chalk.blue(process.env.MONGO_URI)
    )
  }

  console.log(
    chalk.white('[server]'),
    chalk.green('lifted'),
    chalk.dim(`: ${+liftFinishedAt - +liftStartedAt}ms`)
  )
  console.log()

  return app
}

export { load, app }
