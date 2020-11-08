import mongoStep from '@app/setup/mongo'
import expressStep from '@app/setup/express'

import apiGeneral from '@app/setup/api.general'
import apiTracks from '@app/setup/api.tracks'

type AppSteps = {
  mongo?: typeof mongoStep
  express?: typeof expressStep
  'api.general'?: typeof apiGeneral
  'api.tracks'?: typeof apiTracks
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lift?: any
}

export default AppSteps
