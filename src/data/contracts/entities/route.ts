import { ObjectId } from 'mongodb'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity('route')
export class Route {
  @ObjectIdColumn()
  public _id: ObjectId

  @Column()
  public uuid: string

  @Column()
  public created_at: Date

  @Column()
  public updated_at: Date

  @Column()
  public enterprise_uuid: string

  @Column()
  public subtenant_uuid: string

  @Column()
  public tenant_uuid: string

  @Column()
  public tertenant_uuid: string

  @Column()
  public restriction_uuid: string

  @Column()
  public name: string

  @Column()
  public duration: number

  @Column()
  public distance: number

  @Column()
  public paths: Array<{
    start_point_address: string
    end_point_address: string
    start_point: {
      lat: number
      lng: number
    }

    end_point: {
      lat: number
      lng: number
    }
    distance: number
    duration: number
    legs: Array<{
      distance: number
      duration: number
      start_point: {
        lat: number
        lng: number
      }

      end_point: {
        lat: number
        lng: number
      }
      steps: Array<{
        distance: number
        duration: number
        start_point: {
          lat: number
          lng: number
        }
        end_point: {
          lat: number
          lng: number
        }
        polyline: string
      }>
    }>
  }>

  public devices_uuid: string[]
}
