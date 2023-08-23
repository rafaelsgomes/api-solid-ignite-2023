import { IGymsRepository } from '@/repositories/IGymsRepository'
import { Gym } from '@prisma/client'

interface CreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private usersRepository: IGymsRepository) {}

  async execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.usersRepository.create({
      description,
      latitude,
      longitude,
      phone,
      title,
    })

    return {
      gym,
    }
  }
}
