import { DataSource } from "typeorm";
import LoggerService from "../services/logger.service";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Users } from "../entities/users.entity";
const { DB_HOST, DB_USER, DB_NAME, DB_PASS } = process.env;

// export const appDataSource = new DataSource({
//   type: "postgres",
//   host: DB_HOST,
//   port: 5432,
//   database: DB_NAME,
//   username: DB_USER,
//   password: DB_PASS,
//   synchronize: true,
//   logging: false,
//   subscribers: [],
//   migrations: [],
//   entities: [Users],
//   namingStrategy: new SnakeNamingStrategy(),
// });

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
