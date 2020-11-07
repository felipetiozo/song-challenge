import _ from 'lodash'
import mongoose from 'mongoose'
import aqp from 'api-query-params'
import BadRequest from '@app/errors/BadRequest'

type optionsDefaults = {
  limit: number
  page: number
  sort: string
  includes?: string[]
}

type optionsWhitelist = {
  [key: string]: string | string[]
}

type optionsAllowPopulate = {
  [key: string]: {
    path: string
    match: unknown
    populate: optionsAllowPopulate
  }
}

interface iOptions {
  defaults?: optionsDefaults
  whitelist?: optionsWhitelist
  allowPopulate?: optionsAllowPopulate
}

export default function makeQuery(query, options: iOptions = {}) {
  // create defaults
  const params = _.defaults(
    query,
    options.defaults || {
      limit: 10,
      page: 0,
      sort: '-createdAt',
    }
  )

  const whitelistedParams = {
    skip: parseInt(params.limit) * parseInt(params.page),
    sort: params.sort,
    limit: parseInt(params.limit),
  }

  const allowedKeys = _.keys(options.whitelist)

  _.mapKeys(params, (input, key) => {
    const cleanedKey = key.replace(/[!<>]/g, '')

    // if query passed by user is not allowed return
    if (!allowedKeys.includes(cleanedKey)) {
      return
    }

    if (input == undefined) return

    // cast input to array
    input = _.castArray(input)

    // cast allowedTypes to array
    const allowedTypes = _.castArray(options.whitelist[cleanedKey])

    // check if all inputs have some type
    const isValid = allowedTypes.some((type) =>
      input.every((i) => checkType(type, cast(i)))
    )

    if (!isValid) {
      throw new BadRequest(
        `${key} allowedTypes are (${allowedTypes.join(', ')})`
      )
    }

    // hot fix on query based on fields
    whitelistedParams[key] = input.length == 1 ? input[0] : input
  })

  // apply filters
  const mongoQuery = aqp(whitelistedParams, {
    projectionKey: 'includes',
  })

  // apply populate
  if (params.includes) {
    // check e is passed with comma
    params.includes = _.castArray(commaToArray(params.includes))
    // filter allowedPopulations
    mongoQuery.populate =
      params.includes
        .filter((p) => _.get(options.allowPopulate || {}, p))
        .map((p) => _.get(options.allowPopulate || {}, p)) || []
  } else {
    mongoQuery.populate = []
  }

  // handle skip problem of aqp
  if (!('skip' in mongoQuery)) {
    mongoQuery.skip = 0
  }

  // Check if customFields query was passed or any keys matches the beggining of BASE_PATH
  if (params.fields) {
    // Apply object filter to fields
    mongoQuery.filter.fields = Object.assign({}, params.fields)
  }

  // get all paths from fields.
  const BASE_PATH = 'fields.'
  const fieldsPath = _.pickBy(params, (value, key) =>
    _.startsWith(key, BASE_PATH)
  )
  const fieldsQuery = aqp(
    _.mapKeys(fieldsPath, (val, key) => key.replace(BASE_PATH, 'fieldsData.'))
  )

  // merge fields query with mongoQuery
  mongoQuery.filter = Object.assign(
    {},
    mongoQuery.filter || {},
    fieldsQuery.filter || {}
  )

  return mongoQuery
}

function commaToArray(string) {
  return _.isString(string) ? string.split(',') : string
}

function cast(value) {
  // Match boolean values
  if (value === 'true' || value === true) {
    return true
  }
  if (value === 'false' || value === false) {
    return false
  }

  // Match null
  if (value === 'null' || value === null) {
    return null
  }

  // Match regex operators like /foo_\d+/i
  const regex = _.isString(value) && value.match(/^\/(.*)\/(i?)$/)
  if (regex) {
    return new RegExp(regex[1], regex[2])
  }

  // Match numbers (string padded with zeros are not numbers)
  if (
    !isNaN(Number(value)) &&
    !/^0[0-9]+/.test(value) &&
    /^[0-9]+/.test(value)
  ) {
    return Number(value)
  }

  // Match YYYY-MM-DDTHH:mm:ssZ format dates
  /* eslint-disable max-len */
  const date =
    _.isString(value) &&
    value.match(
      /[12]\d{3}(-(0[1-9]|1[0-2])(-(0[1-9]|[12][0-9]|3[01]))?)(T| )?(([01][0-9]|2[0-3]):[0-5]\d(:[0-5]\d(\.\d+)?)?(Z|[+-]\d{2}:\d{2})?)?/
    )
  /* eslint-enable max-len */
  if (date) {
    return new Date(value)
  }

  return value
}

function checkType(type, value) {
  const fn =
    {
      string: _.isString,
      boolean: _.isBoolean,
      date: _.isDate,
      objectid: mongoose.Types.ObjectId.isValid,
      object: _.isObject,
      number: _.isNumber,
      regexp: _.isRegExp,
      null: _.isNull,
      any: () => {
        return true
      },
    }[type.toLowerCase()] || null

  return _.isFunction(fn) && fn(value)
}
