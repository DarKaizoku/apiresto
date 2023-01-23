import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './entity/User';

export const AppDataSource = new DataSource({
        type: 'postgres',
        port: 5432,
        username: process.env.DB_USERNAME,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        synchronize: true,
        logging: false,
        entities: [User],
        migrations: [],
        subscribers: [],
});
