import { Logger } from 'winston'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Inject, Injectable } from '@nestjs/common'
import { ILoggerService } from '@/domain/services'

@Injectable()
export class LoggerService implements ILoggerService {
  constructor (
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger
  ) { }

  info (value: object | string): void {
    if (typeof value === 'object') {
      this.logger.info(JSON.stringify(value))
    } else {
      this.logger.info(value)
    }
  }

  debug (value: object | string): void {
    if (typeof value === 'object') {
      this.logger.debug(JSON.stringify(value))
    } else {
      this.logger.debug(value)
    }
  }

  error (err: Error): void {
    this.logger.error(err.stack)
  }
}
