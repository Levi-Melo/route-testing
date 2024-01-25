import { LoggerService } from '@/data/contracts/services'
import { Global, Module } from '@nestjs/common'

@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService]
})
export class LoggerModule { }
