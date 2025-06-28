import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Model3D } from './models3d/entities/model3d.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: {
        rejectUnauthorized: false,
    },
    entities: [User, Model3D],
    synchronize: false,
});
