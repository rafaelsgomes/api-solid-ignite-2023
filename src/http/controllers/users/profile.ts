import { makeGetUserProfileUseCase } from '@/useCases/factories/makeGetUserProfileUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({
    useId: request.user.sub,
  })
  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
