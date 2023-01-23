import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Users } from './entity/Users';
import { Restos } from './entity/Restos';
import { Menus } from './entity/Menus';
import { Commandes } from './entity/Commandes';

dotenv.config({ path: '.env' }); //corrige le probleme "password" must be a string
export const AppDataSource = new DataSource({
        type: 'postgres',
        port: 5432,
        username: process.env.DB_USERNAME,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        synchronize: true,
        logging: false,
        entities: [Users, Restos, Menus, Commandes],
        migrations: [],
        subscribers: [],
});
