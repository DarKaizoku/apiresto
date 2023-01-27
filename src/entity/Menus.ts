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
        @OneToMany(() => Commandes, (commandes) => commandes.menus)
        menu_id: number;
        @Column({ type: 'varchar' })
        menu_nom: string;
        @Column({ type: 'numeric' })
        menu_prix: number;


        @JoinColumn({
                name: 'listCommande',
                referencedColumnName: 'commande_id',
        })
        commande: Commandes[] | Commandes;
}
