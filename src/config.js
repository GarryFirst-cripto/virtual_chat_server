import dotenv from 'dotenv';
import * as pgStringParser from 'pg-connection-string';

dotenv.config();

const herokuData = process.env.CLEARDB_DATABASE_URL
  ? pgStringParser.parse(process.env.CLEARDB_DATABASE_URL)
  : {};

const env = {
    connection: {
      type: process.env.TYPEORM_CONNECTION,
      host: herokuData.host || process.env.TYPEORM_HOST,
      port: herokuData.port || process.env.TYPEORM_PORT,
      database: herokuData.database || process.env.TYPEORM_DATABASE,
      username: herokuData.user || process.env.TYPEORM_USERNAME,
      password: herokuData.password || process.env.TYPEORM_PASSWORD,
      logging: (process.env.TYPEORM_LOGGING === 'true'),
      synchronize: (process.env.TYPEORM_SYNCHRONIZE === 'true'),
      migrationsRun: (process.env.TYPEORM_MIGRATIONS_RUN === 'true'),
      migrations: [process.env.TYPEORM_MIGRATIONS],  //  **** !! ****
      cli: {
        migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR
      },
      entities: [process.env.TYPEORM_ENTITIES]  //  **** !! ****
    },
    port: process.env.PORT
};

export default env;
