import { join } from 'path'
import { DataSource } from 'typeorm'

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mongodb',
        url: process.env.MONGO_DB_URL,
        // synchronize: true,
        logging: false,
        entities: [
          join(__dirname, '../../../data/contracts/entities', '*.{ts,js}')
        ],
        migrations: [],
        subscribers: [],
        useUnifiedTopology: true
      })
      return await dataSource.initialize()
    }
  }
]
