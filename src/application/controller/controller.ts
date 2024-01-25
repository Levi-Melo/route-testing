import { Controller, Get } from '@nestjs/common'
import { IsOnRoute } from '@/application/usecases'
import { LoggerService } from '@/data/contracts/services'
@Controller()
export class AppController {
  constructor (private readonly _isOnRoute: IsOnRoute, private readonly _logger: LoggerService) {}

  @Get('run')
  async run (): Promise<void> {
    while (true) {
      const res = await this._isOnRoute.perform({ lat: -23.461280, lng: -46.880027, routeId: '8179b255-f9e9-4b74-ad7a-0168c327155b' })
      this._logger.info({ ok: res })
      setTimeout(() => {}, 1)
    }
  }
}
