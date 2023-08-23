import { Prisma, CheckIn } from '@prisma/client'

export interface ICheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  update(checkIn: CheckIn): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  findById(id: string): Promise<CheckIn | null>
  countByUserId(useId: string): Promise<number>
}
