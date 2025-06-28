import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';


@Entity()
export class Model3D {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.models, { eager: true })
    user: User;

    @Column()
    name: string;

    @Column({ nullable: true, type: 'text' })
    description?: string;

    @Column({ nullable: true })
    format?: string;

    @Column({ nullable: true, type: 'float' })
    sizeMB?: number;

    @Column({ nullable: true })
    tags?: string;

    @Column({ nullable: true })
    license?: string;

    @Column({ nullable: true })
    author?: string;

    @Column({ nullable: true })
    previewImage?: string;

    @Column({ nullable: true })
    videoUrl?: string;

    @Column({ nullable: true, type: 'float' })
    price?: number;

    @Column({ nullable: true })
    currency?: string;

    @Column({ nullable: true })
    views?: number;

    @Column({ nullable: true, type: 'float' })
    rating?: number;

    @Column({ nullable: true })
    reviewCount?: number;

    @Column({ nullable: true })
    refundable?: boolean;

    @Column()
    filename: string;

    @Column()
    url: string;

    @CreateDateColumn()
    uploadedAt: Date;
}
