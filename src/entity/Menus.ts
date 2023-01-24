import {
        BaseEntity,
        Column,
        Entity,
        ManyToOne,
        PrimaryGeneratedColumn,
} from 'typeorm';
import { Commandes } from './Commandes';

@Entity()
export class Menus extends BaseEntity {
        @PrimaryGeneratedColumn()
        menu_id: Number;
        @Column({ type: 'varchar' })
        menu_nom: string;
        @Column({ type: 'numeric' })
        menu_prix: Number;

        @ManyToOne((type) => Commandes, (commandes) => commandes.menus)
        /* @JoinTable({
                name: 'commandes_menus', // table name for the junction table of this relation
                joinColumn: {
                        name: 'menus',
                        referencedColumnName: 'menu_id',
                },
                inverseJoinColumn: {
                        name: 'commandes',
                        referencedColumnName: 'commande_id',
                },
        }) */
        menus: Commandes[] | Commandes;
}
