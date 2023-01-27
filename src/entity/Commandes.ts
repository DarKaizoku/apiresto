import { type } from 'os';
import {
        BaseEntity,
        Column,
        Entity,
        JoinColumn,
        JoinTable,
        OneToMany,
        OneToOne,
        PrimaryGeneratedColumn,
} from 'typeorm';
import { TUser } from '../types/TUser';
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
        @OneToOne(() => Users, (user) => user.user_id, {
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                eager: true,
        })
        @JoinColumn({ name: 'user_id' })
        user_id: number | TUser;
        @OneToOne(() => Restos, (resto) => resto.resto_ville, {
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                eager: true,
        })
        @JoinColumn({
                name: 'resto_ville',
                referencedColumnName: 'resto_ville',
        })
        resto: string;

        @OneToOne(() => Menus, (menu) => menu.menu_id, {
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
                eager: true,
        })
        @JoinColumn({ name: 'menu_id' })
        menus: number;
}
