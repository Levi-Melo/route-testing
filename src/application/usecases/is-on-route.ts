import { IIsOnRoute } from '@/domain/usecases'
import { RouteRepository } from '@/infra/mongodb/repositories'
import { Injectable } from '@nestjs/common'

interface Point {
  lat: number
  lng: number
}

@Injectable()
export class IsOnRoute implements IIsOnRoute {
  constructor (private readonly repo: RouteRepository) {}

  private toRadians (deg: number): number {
    return deg * Math.PI / 180
  }

  private haversineDistance (pointA: Point, pointB: Point): number {
    const R = 6371 // Raio da Terra em km
    const dLat = this.toRadians(pointB.lat - pointA.lat)
    const dLon = this.toRadians(pointB.lng - pointA.lng)
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(pointA.lat)) * Math.cos(this.toRadians(pointB.lat)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  private isCloseEnough (pointA: Point, pointB: Point, pointQ: Point, threshold: number): boolean {
    const dAB = this.haversineDistance(pointA, pointB)
    const dAQ = this.haversineDistance(pointA, pointQ)
    const dBQ = this.haversineDistance(pointB, pointQ)

    if (dAB > dAQ + dBQ) {
      return false
    }

    return dAQ < threshold || dBQ < threshold
  }

  async perform ({ lat, lng, routeId }: IIsOnRoute.Params): Promise<boolean> {
    const route = await this.repo.get({ uuid: routeId })
    if (!route) {
      return false
    }
    for (const path of route.paths) {
      const isPathClose = this.isCloseEnough(path.start_point, path.start_point, { lat, lng }, 10)
      if (isPathClose) {
        for (const leg of path.legs) {
          const isLegClose = this.isCloseEnough(leg.start_point, leg.end_point, { lat, lng }, 5)
          if (isLegClose) {
            for (const step of leg.steps) {
              const isClose = this.isCloseEnough(step.start_point, step.end_point, { lat, lng }, 1)
              if (isClose) {
                return true
              }
            }
          }
        }
      }
    }
    return false
  }
}
