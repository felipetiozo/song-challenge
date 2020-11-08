import funcWrapper from '@app/helpers/api/funcWrapper'
import func from './func'
import { Router } from 'express'

export default async function route(router: Router) {
  router.post('/:spotifyTrackId/challenge', funcWrapper(func))
}
