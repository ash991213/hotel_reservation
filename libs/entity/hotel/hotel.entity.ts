import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Room } from '@libs/entity/room/room.entity';

@Entity({ name: 'hotel' })
export class Hotel {
    @PrimaryGeneratedColumn()
    hotel_id: number;

    @Column({ length: 50, nullable: false })
    name: string;

    @Column({ length: 150, nullable: false })
    address: string;

    @Column({ length: 150, nullable: false })
    location: string;

    @OneToMany(() => Room, (room) => room.hotel)
    rooms: Room[];
}
