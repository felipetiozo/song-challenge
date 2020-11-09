import BadRequest from '@app/errors/BadRequest'
import { Request, Response, NextFunction } from 'express'

export default function https(req: Request, res: Response, next: NextFunction) {
  const isProduction = process.env.NODE_ENV === 'production'
  const isUsingHTTPS = req.headers['x-forwarded-proto'] === 'https'

  if (isProduction && !isUsingHTTPS && req.path !== '/') {
    return next(
      new BadRequest(
        `Requisições HTTP não são suportadas pela API. Use rotas HTTPS para acesso.`
      )
    )
  } else {
    return next()
  }
}
