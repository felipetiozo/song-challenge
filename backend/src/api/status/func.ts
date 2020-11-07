import { app } from '@app/app'

export default async function func() {
  return {
    status: 'alive',
    now: new Date(),
    mongo: app.mongo.STATES[app.mongo.connection.readyState],
  }
}
