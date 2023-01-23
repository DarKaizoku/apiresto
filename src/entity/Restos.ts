import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Restos {
        @PrimaryGeneratedColumn()
        resto_id: number;
        @Column({ type: 'varchar' })
        resto_ville: string;
}
