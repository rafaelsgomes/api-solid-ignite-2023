import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository'
import { CreateGymUseCase } from '@/useCases/createGym'

export function makeCreateGymUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(prismaGymsRepository)

  return useCase
}
