import { DataSource } from "typeorm";
import LoggerService from "../services/logger.service";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
export class Database {
  constructor() {
    Database.appDataSource = new DataSource({
      type: "postgres",
      host: process.env.DB_HOST,
      port: 5432,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      synchronize: true,
      logging: false,
      subscribers: [],
      migrations: [],
      entities: [__dirname + "/../entities/*.js"],
      namingStrategy: new SnakeNamingStrategy(),
    });
  }
  static appDataSource: DataSource;

  async init() {
    Database.appDataSource.initialize().then(() => {
      LoggerService.info({
        message: "Database has been initialized",
      });
    });
  }
}
