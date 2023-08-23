import { Prisma, Gym } from '@prisma/client'

export interface FindManyNearByParams {
  latitude: number
  longitude: number
}

export interface IGymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearBy(params: FindManyNearByParams): Promise<Gym[]>
}
