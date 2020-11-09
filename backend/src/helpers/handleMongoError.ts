import _ from 'lodash'
import Conflict from '@app/errors/Conflict'
import BadRequest from '@app/errors/BadRequest'

export default function handleMongoError(maybeError) {
  if (maybeError == null) return

  // Call self recursivelly if in an array
  if (_.isArray(maybeError)) {
    maybeError.map(handleMongoError)
    return
  }

  if (maybeError.name == 'ValidationError') {
    throw new BadRequest(maybeError.message)
  }

  if (maybeError.code == 11000) {
    const firstSplit = _.get(maybeError.message.split('index: '), '1', '')
    const secondSplit = _.get(firstSplit.split('dup key'), '0')
    const index = secondSplit
      .replace(/\s/g, '')
      .split('_')
      .filter((a) => a != '1')
    const last = index[index.length - 1]
    throw new Conflict(last)
  }

  throw maybeError
}
