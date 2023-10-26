import { makeGetUserMetricsUseCase } from '@/useCases/factories/makeGetUserMetricsUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const checkInMetricsUseCase = makeGetUserMetricsUseCase()
  const { checkInsCount } = await checkInMetricsUseCase.execute({
    useId: request.user.sub,
  })

  return reply.status(200).send({
    checkInsCount,
  })
}
