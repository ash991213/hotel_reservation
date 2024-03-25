import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Hotel } from '@libs/entity/hotel/hotel.entity';

@Entity('room')
export class Room {
    @PrimaryGeneratedColumn()
    room_id: number;

    @Column()
    hotel_id: number;

    @Column()
    room_type_inventory_id: number;

    @Column()
    floor: number;

    @Column()
    room_number: number;

    @Column({ length: 100 })
    name: string;

    @Column()
    is_available: boolean;

    @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
    @JoinColumn({ name: 'hotel_id' })
    hotel: Hotel;
}
