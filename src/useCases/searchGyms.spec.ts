import { describe, expect, it, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './searchGyms'
import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemoryGymsRepository'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('Should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'gym-01',
      latitude: -23.5201136,
      longitude: -46.5258994,
      description: null,
      phone: null,
    })

    await gymsRepository.create({
      title: 'gym-02',
      latitude: -23.5201136,
      longitude: -46.5258994,
      description: null,
      phone: null,
    })

    const { gyms } = await sut.execute({
      query: '01',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'gym-01' })])
  })

  it('Should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `gym-${i}`,
        latitude: -23.5201136,
        longitude: -46.5258994,
        description: null,
        phone: null,
      })
    }

    const { gyms } = await sut.execute({
      query: 'gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'gym-21' }),
      expect.objectContaining({ title: 'gym-22' }),
    ])
  })
})
