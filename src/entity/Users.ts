import {
        BaseEntity,
        Column,
        Entity,
        ManyToOne,
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
        @OneToMany(() => Commandes, (commande) => commande.user_id)
        user_id: number;
        @Column({ type: 'varchar' })
        username: string;
        @Column({ type: 'varchar', select: false }) // le select permet l'affichage ou non de la donnée lors de la requete xD
        password: string;
        @Column({ type: 'boolean', default: false })
        admin: boolean;
}
