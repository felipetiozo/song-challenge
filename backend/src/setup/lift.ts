import App from '@app/types/App'
import notFound from '@app/middlewares/notFound'
import errorMiddleware from '@app/middlewares/error'

export default async function liftSetup(app: App) {
  app.express.all('*', notFound)
  app.express.use('*', errorMiddleware)
  app.express.set('port', process.env.PORT || 7900)
  await app.express.listen(app.express.get('port'))
}
