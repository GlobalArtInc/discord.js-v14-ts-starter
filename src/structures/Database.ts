import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
export class Database {
  static appDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    synchronize: false, // Do not use true for production
    logging: false,
    subscribers: [],
    migrations: [],
    entities: [__dirname + '/../entities/*.js'],
    namingStrategy: new SnakeNamingStrategy(),
  });

  async init() {
    Database.appDataSource.initialize().then(() => {
      console.log('Database has been initialized');
    });
  }
}
