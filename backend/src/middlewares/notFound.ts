import NotFound from '@app/errors/NotFound'

export default async function notFound(req, res, next) {
  return next(new NotFound('Rota não encontrada'))
}
