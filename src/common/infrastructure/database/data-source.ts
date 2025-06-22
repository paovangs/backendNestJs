import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { UserOrmEntity } from './typeorms/entities/user.orm';

config(); // ໂຫຼດຈາກ .env
export const dataSource = new DataSource({
  type: 'postgres', // ຖ້າເປັນ mySQL ກໍ່ໃຊ້ 'mysql'
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'apply_course',
  synchronize: Boolean(process.env.DB_SYNCHRONIZE) || false,
  logging: Boolean(process.env.DB_LOGGING || false),
  entities: [UserOrmEntity], // ເພີ່ມ entities ທີ່ຈະໃຊ້
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations', // ຊື່ table ສຳຫຼັບເກັບ migrations
});
