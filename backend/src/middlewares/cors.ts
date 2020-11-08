import { Request, Response, NextFunction } from 'express'

export default function cors(req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*')

  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')

  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  )

  res.header('Access-Control-Allow-Credentials', 'true')

  res.header('Access-Control-Max-Age', '600')

  // Send headers just after OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }

  next()
}
