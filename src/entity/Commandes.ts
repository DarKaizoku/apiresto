import { type } from 'os';
import {
        BaseEntity,
        Column,
        Entity,
        JoinColumn,
        OneToMany,
        OneToOne,
        PrimaryGeneratedColumn,
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
export class Commandes extends BaseEntity {
        @PrimaryGeneratedColumn()
        commande_id: number;
        @OneToOne(() => Users, (user) => user.user_id)
        @JoinColumn()
        user: number;
        @OneToOne(() => Restos, (resto) => resto.resto_ville)
        @JoinColumn({ referencedColumnName: 'resto_ville' })
        resto: string;

        @OneToMany(() => Menus, (menu) => menu.menu_id)
        /* @JoinTable({
                name: 'commandes_menus', // table name for the junction table of this relation
                joinColumn: {
                        name: 'commandes',
                        referencedColumnName: 'commande_id',
                },
                inverseJoinColumn: {
                        name: 'menus',
                        referencedColumnName: 'menu_id',
                },
        }) */
        menus: Number[];
}
