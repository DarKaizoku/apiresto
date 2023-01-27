import {
        BaseEntity,
        Column,
        Entity,
        OneToMany,
        PrimaryGeneratedColumn,
        Unique,
} from 'typeorm';
import { Commandes } from './Commandes';

//pkoi po faire enum pour le role admin/user !!
@Entity()
@Unique(['username'])
export class Users extends BaseEntity {
        @PrimaryGeneratedColumn()
        @OneToMany(() => Commandes, (commandes) => commandes.user_id)
        user_id: number;
        @Column({ type: 'varchar' })
        username: string;
        @Column({ type: 'varchar' })
        password: string;
        @Column({ type: 'boolean', default: false })
        admin: boolean;
}
