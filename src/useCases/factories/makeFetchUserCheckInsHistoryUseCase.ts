import { PrismaCheckInsRepository } from '@/repositories/prisma/prismaCheckInsRepository'
import { FetchUserCheckInsHistoryUseCase } from '@/useCases/fetchUserCheckInsHistory'

export function makeFetchUserCheckInsHistoryUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsHistoryUseCase(prismaCheckInsRepository)

  return useCase
}
