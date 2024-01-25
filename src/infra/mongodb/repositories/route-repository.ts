import { Inject, Injectable } from '@nestjs/common'
import { MongoRepository } from 'typeorm'
import { Route } from '@/data/contracts/entities'
import { BaseRepository } from './@shared'

@Injectable()
export class RouteRepository extends BaseRepository<Route> {
  constructor (
    @Inject('ROUTE_REPOSITORY')
    private readonly repository: MongoRepository<Route>
  ) {
    super(repository)
  }
}
