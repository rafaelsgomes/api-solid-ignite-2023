import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verifyJWT'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'
import { verifyUserRole } from '@/http/middlewares/verifyUserRole'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
