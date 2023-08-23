import { describe, expect, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './createGym'
import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemoryGymsRepository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })
  it('Should be able to create a new gym', async () => {
    const { gym } = await sut.execute({
      title: 'gym-01',
      latitude: -23.5201136,
      longitude: -46.5258994,
      description: null,
      phone: null,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
