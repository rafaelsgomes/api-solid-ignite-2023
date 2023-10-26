import { PrismaCheckInsRepository } from '@/repositories/prisma/prismaCheckInsRepository'
import { GetUserMetricsUseCase } from '@/useCases/getUserMetrics'

export function makeGetUserMetricsUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(prismaCheckInsRepository)

  return useCase
}
