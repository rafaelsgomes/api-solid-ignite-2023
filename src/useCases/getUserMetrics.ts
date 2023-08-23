import { ICheckInsRepository } from '@/repositories/ICheckInsRepository'

interface GetUserMetricsUseCaseRequest {
  useId: string
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    useId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(useId)

    return {
      checkInsCount,
    }
  }
}
