import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Model3D } from '../../models3d/entities/model3d.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ type: 'varchar', default: 'viewer' })
    role: 'admin' | 'viewer';

    @OneToMany(() => Model3D, (model) => model.user)
    models: Model3D[];
}
