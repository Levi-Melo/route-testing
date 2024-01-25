export interface IIsOnRoute {
  perform: (params: IIsOnRoute.Params) => Promise<IIsOnRoute.Response>
}

export namespace IIsOnRoute {
  export interface Params {
    lat: number
    lng: number
    routeId: string
  }
  export type Response = boolean
}
