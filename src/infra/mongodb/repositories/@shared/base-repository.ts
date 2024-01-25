import { IAllQuery, IManyQuery, IRepository } from '@/data/contracts/repos'
import { DeepPartial, OmitBaseEntity } from '@/domain/@shared/types'
import { FindOptionsWhere, MongoRepository } from 'typeorm'

export class BaseRepository<T extends object> implements IRepository<T> {
  constructor (private readonly _repository: MongoRepository<T>) { }
  async get (entity: FindOptionsWhere<T>): Promise<T | null> {
    return await this._repository.findOne({ where: entity })
  }

  async getMany ({
    skip = 0,
    take = 10,
    where
  }: IManyQuery<T>): Promise<[T[], number]> {
    return await this._repository.findAndCount({
      skip,
      take,
      where
    })
  }

  async getAll ({ where }: IAllQuery<T>): Promise<T[]> {
    return await this._repository.find({ where })
  }

  async insert (entity: OmitBaseEntity<T>): Promise<T> {
    return await this._repository.save({ ...entity, active: true } as any)
  }

  async update (entity: DeepPartial<OmitBaseEntity<T>> & { _id: string }): Promise<T> {
    await this._repository.updateOne({ _id: entity._id }, { $set: { ...entity } })
    const result = await this._repository.findOne({ where: { _id: entity._id } })
    if (result == null) {
      throw new Error('server error - update')
    }
    return result
  }

  async delete ({ _id }: { _id: string }): Promise<boolean> {
    const result = await this._repository.updateOne({ _id }, { active: false })

    return result.modifiedCount > 0
  }
}
