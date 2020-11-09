import express from 'express'
import App from '@app/types/App'

/**
 * Routes
 */
import statusRoute from '@app/api/status/route'

export default async function apiHealthCheck(app: App) {
  const api = express()

  const routers = [statusRoute]
  for (const route of routers) {
    await route(api)
  }

  app.express.use('/v1', api)

  return api
}
