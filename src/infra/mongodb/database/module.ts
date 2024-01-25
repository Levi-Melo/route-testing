import { Global, Module } from '@nestjs/common'
import { databaseProviders } from './provider'
import { ConfigModule } from '@nestjs/config'
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true })
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders]
})
export class DatabaseModule { }
