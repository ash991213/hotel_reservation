import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Room } from '../room/room.entity';
import { User } from '../user/user.entity';
import { STATUS } from '@libs/utils/common/const/enum.const';

@Entity({ name: 'reservation' })
export class Reservation {
    @PrimaryGeneratedColumn()
    reservation_id: number;

    @Column()
    room_id: number;

    @Column()
    guest_id: number;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column({
        type: 'enum',
        enum: STATUS,
        default: STATUS.PENDING_PAYMENT,
    })
    status: string;

    @Column()
    reserved_rate: number;

    @ManyToOne(() => Room)
    @JoinColumn({ name: 'room_id' })
    room: Room;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'guest_id' })
    guest: User;
}
