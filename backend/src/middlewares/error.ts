import _ from 'lodash'

import Timeout from '@app/errors/Timeout'
import NotFound from '@app/errors/NotFound'
import Conflict from '@app/errors/Conflict'
import Forbidden from '@app/errors/Forbidden'
import BadRequest from '@app/errors/BadRequest'
import Unauthorized from '@app/errors/Unauthorized'
import Unprocessable from '@app/errors/Unprocessable'

export default function error(err, req, res, next) {
  if (!err) {
    return next()
  }

  const body = parseError(err)

  const isProduction = process.env.NODE_ENV === 'production'

  // Add stack on debug mode
  if (!isProduction) {
    body.stack = err.stack
  }

  // Apply status to response
  res.status(body.status)

  // Cleanup body if in production
  if (isProduction && body.status == 500) {
    // Prepare response to user
    body.type = 'FatalError'
    body.error =
      'Um erro inesperado aconteceu e foi enviado aos nossos desenvolvedores'
  }

  if (body.status == 500) {
    body.type = 'FatalError'
    body.error =
      'Um erro inesperado aconteceu e foi enviado aos nossos desenvolvedores'

    // TODO: Implement sentry

    if (!isProduction) {
      console.log(err)
    }
  }

  // Send back error
  return res.send(body)
}

function parseError(err) {
  const MappingErrors = [
    { status: 400, name: 'BadRequest', class: BadRequest },
    { status: 401, name: 'Unauthorized', class: Unauthorized },
    { status: 403, name: 'Forbidden', class: Forbidden },
    { status: 404, name: 'NotFound', class: NotFound },
    { status: 408, name: 'Timeout', class: Timeout },
    { status: 409, name: 'Conflict', class: Conflict },
    { status: 422, name: 'Unprocessable', class: Unprocessable },
  ]

  const errorClass = _.find(
    MappingErrors,
    (maybe) => err instanceof maybe.class
  ) || { status: 500, name: 'FatalError' }

  type parsedStack = {
    status: number
    name: string
    type: string
    error: string
    stack?: string
  }

  const parsed: parsedStack = {
    status: errorClass.status,
    name: errorClass.name,
    type: err.name,
    error: err.message,
  }

  return parsed
}
