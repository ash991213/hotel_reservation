import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ length: 50 })
    first_name: string;

    @Column({ length: 50 })
    last_name: string;

    @Column({ length: 255 })
    email: string;
}
