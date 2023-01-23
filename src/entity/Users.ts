import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//pkoi po faire enum pour le role admin/user !!
@Entity()
export class Users {
        @PrimaryGeneratedColumn()
        user_id: number;
        @Column({ type: 'varchar' })
        username: string;
        @Column({ type: 'varchar' })
        password: string;
        @Column({ type: 'boolean', default: false })
        admin: boolean;
}
