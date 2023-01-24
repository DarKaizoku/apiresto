import {
        BaseEntity,
        Column,
        Entity,
        OneToMany,
        PrimaryGeneratedColumn,
        Unique,
} from 'typeorm';

//pkoi po faire enum pour le role admin/user !!
@Entity()
@Unique(['username'])
export class Users extends BaseEntity {
        @PrimaryGeneratedColumn()
        user_id: number;
        @Column({ type: 'varchar' })
        username: string;
        @Column({ type: 'varchar' })
        password: string;
        @Column({ type: 'boolean', default: false })
        admin: boolean;
}
