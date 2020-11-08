import stream from 'stream'
import { Request, Response, NextFunction } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiFunc = (context: any) => any

export default (func: ApiFunc) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Context that will be passed to func
    const context = req

    try {
      // Compute func and check the permission
      const result = await func(context)

      // Set status to 204 (No Content) if undefined
      if (result === undefined) {
        res.status(204)
      }

      // If response is a stream, pipe to output
      if (result instanceof stream.Readable) {
        return result
          .on('error', (error) => {
            next(error)
          })
          .pipe(res)
      }

      // Redirect if _redirect key
      if (result && result._redirect) {
        return res.redirect(result._redirect)
      }

      // Respond the request
      res.send(result)
    } catch (e) {
      next(e)
    }
  }
}
