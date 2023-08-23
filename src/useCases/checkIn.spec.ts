import { describe, expect, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './checkIn'
import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository'
import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemoryGymsRepository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/maxNumberOfCheckInsError'
import { MaxDistanceError } from './errors/maxDistanceError'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase
let gymsRepository: InMemoryGymsRepository

describe('Check In Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Gym',
      description: 'Gym',
      phone: '123456789',
      latitude: -23.5201136,
      longitude: -46.5258994,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      useId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -23.5201136,
      userLongitude: -46.5258994,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 7, 17, 8, 0, 0))

    await sut.execute({
      useId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -23.5201136,
      userLongitude: -46.5258994,
    })

    await expect(
      sut.execute({
        useId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -23.5201136,
        userLongitude: -46.5258994,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('Should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 7, 17, 8, 0, 0))

    await sut.execute({
      useId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -23.5201136,
      userLongitude: -46.5258994,
    })

    vi.setSystemTime(new Date(2023, 7, 18, 8, 0, 0))

    const { checkIn } = await sut.execute({
      useId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -23.5201136,
      userLongitude: -46.5258994,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Gym',
      description: 'Gym',
      phone: '123456789',
      latitude: new Decimal(-23.5301646),
      longitude: new Decimal(-46.5708227),
    })

    await expect(() =>
      sut.execute({
        useId: 'user-01',
        gymId: 'gym-02',
        userLatitude: -23.5201136,
        userLongitude: -46.5258994,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
