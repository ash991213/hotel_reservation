import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Room } from 'libs/entity/room/room.entity';

@Entity()
export class Hotel {
    @PrimaryGeneratedColumn()
    hotel_id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 150 })
    address: string;

    @Column({ length: 150 })
    location: string;

    @OneToMany(() => Room, (room) => room.hotel)
    rooms: Room[];
}
