import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository'
import { FetchNearbyGymsUseCase } from '@/useCases/fetchNearbyGyms'

export function makeFetchNearbyGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(prismaGymsRepository)

  return useCase
}
