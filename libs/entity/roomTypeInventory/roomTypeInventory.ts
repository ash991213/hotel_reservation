import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RoomTypeInventory {
    @PrimaryGeneratedColumn()
    room_type_id: number;

    @Column()
    date: Date;

    @Column()
    room_type_inventory_id: number;

    @Column()
    total_inventory: number;

    @Column()
    total_reserved: number;

    @Column()
    rate: number;
}
