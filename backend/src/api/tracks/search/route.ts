import funcWrapper from '@app/helpers/api/funcWrapper'
import func from './func'
import { Router } from 'express'

export default async function route(router: Router) {
  router.get('/search', funcWrapper(func))
}
