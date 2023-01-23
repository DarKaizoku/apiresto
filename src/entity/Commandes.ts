import { type } from 'os';
import {
        Column,
        Entity,
        JoinColumn,
        JoinTable,
        ManyToMany,
        ManyToOne,
        OneToMany,
        PrimaryGeneratedColumn,
        QueryResult,
} from 'typeorm';
import { Menus } from './Menus';
import { Restos } from './Restos';
import { Users } from './Users';

@Entity()
/* export class Commandes {
        @PrimaryGeneratedColumn()
        commande_id: number;
        @Column({ type: 'int' })
        user_id: number;
        @Column({ type: 'int' })
        resto_id: number;
        @Column({ type: 'simple-array' })
        menus_nom: string[] | string;
        @Column({ type: 'simple-array' })
        menus_prix: number[] | number;
} */
export class Commandes {
        @PrimaryGeneratedColumn()
        commande_id: number;
        @ManyToOne((type) => Users)
        @JoinColumn()
        user: number;
        @ManyToOne((type) => Restos)
        @JoinColumn()
        resto: number;

        @ManyToMany((type) => Menus)
        @JoinTable({
                name: 'commandes_menus', // table name for the junction table of this relation
                joinColumn: {
                        name: 'commandes',
                        referencedColumnName: 'commande_id',
                },
                inverseJoinColumn: {
                        name: 'menus',
                        referencedColumnName: 'menu_id',
                },
        })
        menus: number[] | number;
}
