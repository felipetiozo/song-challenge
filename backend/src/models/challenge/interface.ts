import { Document } from 'mongoose'
import { iTrack } from '@app/helpers/SpotifyAPI/interfaces'
import { iDocumentTimestamp } from '@app/models/common/interface'

interface iChallenge extends Document, iDocumentTimestamp {
  subtile: string
  tasks: iTask[]
  track: PartialTrack
  expiresAt: Date
}

export interface iTask {
  subtitleMaskId: string
  type: iTaskType
  values?: string[]
  answer: string
}

enum iTaskType {
  'gap-filling' = 'gap-filling',
  'multiple-choice' = 'multiple-choice',
  'blank-filling' = 'blank-filling',
}

type PartialTrack = Pick<iTrack, 'id' | 'name' | 'album'>

export default iChallenge
