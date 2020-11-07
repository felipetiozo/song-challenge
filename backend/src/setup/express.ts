import morgan from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'

import corsMiddleware from '@app/middlewares/cors'
import httpsMiddleware from '@app/middlewares/https'

export default function expressSetup() {
  const app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(morgan('dev'))

  app.use(corsMiddleware)
  app.use(httpsMiddleware)

  app.all('/', (req, res) => {
    res.send({
      hello: 'Fellow developer!',
      contact: 'felipetiozo10@gmail.com',
    })
  })

  return app
}
