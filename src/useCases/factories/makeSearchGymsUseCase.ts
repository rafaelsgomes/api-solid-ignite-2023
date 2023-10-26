import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository'
import { SearchGymsUseCase } from '@/useCases/searchGyms'

export function makeSearchGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(prismaGymsRepository)

  return useCase
}
