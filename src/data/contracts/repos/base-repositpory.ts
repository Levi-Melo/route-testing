import { DeepPartial, OmitBaseEntity } from '@/domain/@shared/types'
import { FindOptionsWhere } from 'typeorm'

export interface IRepository<T> {
  get: (entity: FindOptionsWhere<T>) => Promise<T | null>
  getAll: (entity: IAllQuery<T>) => Promise<T[]>
  getMany: (entity: IManyQuery<T>) => Promise<[T[], number]>
  insert: (entity: OmitBaseEntity<T>) => Promise<T>
  update: (
    entity: DeepPartial<OmitBaseEntity<T>> & { _id: string },
  ) => Promise<T>
  delete: (data: { _id: string }) => Promise<boolean>
}

export interface IManyQuery<T> {
  skip?: number
  take?: number
  where?: FindOptionsWhere<T>
}

export interface IAllQuery<T> {
  where?: FindOptionsWhere<T>
}
