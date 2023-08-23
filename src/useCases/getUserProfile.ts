import { IUsersRepository } from '@/repositories/IUsersRepository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'

interface GetUserProfileUseCaseRequest {
  useId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    useId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(useId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
