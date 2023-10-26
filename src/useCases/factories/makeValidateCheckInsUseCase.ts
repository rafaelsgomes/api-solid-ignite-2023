import { PrismaCheckInsRepository } from '@/repositories/prisma/prismaCheckInsRepository'
import { ValidateCheckInsUseCase } from '@/useCases/validateCheckIns'

export function makeValidateCheckInsUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInsUseCase(prismaCheckInsRepository)

  return useCase
}
