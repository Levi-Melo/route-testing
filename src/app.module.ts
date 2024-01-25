import { Module } from '@nestjs/common'
import { WinstonModule } from 'nest-winston'
import winston from 'winston'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from './application/logger'
import { DatabaseModule } from './infra/mongodb/database/module'
import { AppController } from './application/controller'
import { IsOnRoute } from './application/usecases'
import { RouteRepository } from './infra/mongodb/repositories'
import { DataSource } from 'typeorm'
import { Route } from './data/contracts/entities'
import { ScheduleModule } from '@nestjs/schedule'
@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    WinstonModule.forRoot({
      level: 'debug',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
            winston.format.colorize(),
            winston.format.errors({ stack: true }),
            winston.format.printf(({ level, message, timestamp }) => {
              return `${timestamp as string} [${level}]: ${message as string}`
            })
          )
        })
      ]
    }),
    ScheduleModule.forRoot(),
    LoggerModule
  ],
  controllers: [AppController],
  providers: [
    IsOnRoute,
    RouteRepository,
    {
      provide: 'ROUTE_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getMongoRepository(Route),
      inject: ['DATA_SOURCE']
    }]
})
export class AppModule {}
