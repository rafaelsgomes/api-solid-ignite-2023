import { describe, expect, it, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetchNearbyGyms'
import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemoryGymsRepository'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('Should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      latitude: -23.5201136,
      longitude: -46.5258994,
      description: null,
      phone: null,
    })

    await gymsRepository.create({
      title: 'Far gym',
      latitude: -23.4951088,
      longitude: -46.6929418,
      description: null,
      phone: null,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.5201136,
      userLongitude: -46.5258994,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
