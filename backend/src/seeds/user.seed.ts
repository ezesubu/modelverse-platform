import * as bcrypt from 'bcrypt';
import { AppDataSource } from '../data-source';
import { User } from '../users/entities/user.entity';
import { Model3D } from '../models3d/entities/model3d.entity';

async function seed() {
    try {
        await AppDataSource.initialize();

        const userRepo = AppDataSource.getRepository(User);
        const modelRepo = AppDataSource.getRepository(Model3D);

        await modelRepo.createQueryBuilder().delete().execute();
        await userRepo.createQueryBuilder().delete().execute();

        const passwordHash1 = await bcrypt.hash('admin123', 10);
        const passwordHash2 = await bcrypt.hash('viewer123', 10);

        const seedUsers = userRepo.create([
            {
                username: 'admin',
                password: passwordHash1,
                role: 'admin',
            },
            {
                username: 'viewer',
                password: passwordHash2,
                role: 'viewer',
            },
        ]);

        await userRepo.save(seedUsers);
        console.log('✅ Users seeded successfully!');
    } catch (err) {
        console.error('❌ Error during seeding:', err);
    } finally {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    }
}

seed();
