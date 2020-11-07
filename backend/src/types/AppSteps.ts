import mongoStep from '@app/setup/mongo'
import expressStep from '@app/setup/express'

import apiGeneral from '@app/setup/api.general'

type AppSteps = {
  mongo?: typeof mongoStep
  express?: typeof expressStep
  'api.general'?: typeof apiGeneral
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lift?: any
}

export default AppSteps
