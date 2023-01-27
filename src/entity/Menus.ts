import {
        BaseEntity,
        Column,
        Entity,
        JoinColumn,
        JoinTable,
        ManyToOne,
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

        @ManyToOne((type) => Commandes, (commandes) => commandes.menus)
        @JoinColumn({
                name: 'listCommande',
                referencedColumnName: 'commande_id',
        })
        commande: Commandes[] | Commandes;
}
