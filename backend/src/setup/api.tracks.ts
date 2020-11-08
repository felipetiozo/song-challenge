import express from 'express'
import App from '@app/types/App'

/**
 * Routes
 */
import searchRoute from '@app/api/tracks/search/route'

export default async function apiHealthCheck(app: App) {
  const api = express()

  const routers = [searchRoute]
  for (const route of routers) {
    await route(api)
  }

  app.express.use('/v1/tracks', api)

  return api
}
