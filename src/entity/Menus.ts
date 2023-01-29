import {
        BaseEntity,
        Column,
        Entity,
        JoinColumn,
        JoinTable,
        ManyToOne,
        OneToMany,
        PrimaryGeneratedColumn,
} from 'typeorm';
import { Commandes } from './Commandes';

@Entity()
export class Menus extends BaseEntity {
        @PrimaryGeneratedColumn()
        menu_id: number;
        @Column({ type: 'varchar' })
        menu_nom: string;
        @Column({ type: 'numeric' })
        menu_prix: number;
}
