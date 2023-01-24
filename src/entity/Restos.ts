import {
        BaseEntity,
        Column,
        Entity,
        PrimaryGeneratedColumn,
        Unique,
} from 'typeorm';

@Entity()
@Unique(['resto_ville'])
export class Restos extends BaseEntity {
        @PrimaryGeneratedColumn()
        resto_id: number;
        @Column({ type: 'varchar' })
        resto_ville: string;
}
