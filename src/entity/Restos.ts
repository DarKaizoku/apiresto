import {
        BaseEntity,
        Column,
        Entity,
        OneToMany,
        PrimaryGeneratedColumn,
        Unique,
} from 'typeorm';
import { Commandes } from './Commandes';

@Entity()
@Unique(['resto_ville'])
export class Restos extends BaseEntity {
        @PrimaryGeneratedColumn()
        resto_id: number;

        @Column({ type: 'varchar' })
        resto_ville: string;
}
