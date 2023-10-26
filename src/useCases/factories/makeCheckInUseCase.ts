import { PrismaCheckInsRepository } from '@/repositories/prisma/prismaCheckInsRepository'
import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository'
import { CheckInUseCase } from '@/useCases/checkIn'

export function makeCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(
    prismaCheckInsRepository,
    prismaGymsRepository,
  )

  return useCase
}
