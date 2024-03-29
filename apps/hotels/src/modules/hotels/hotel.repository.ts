import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';
import { Hotel } from '@libs/entity/models/hotel/hotel.entity';
import { CreateHotelDto, UpdateHotelDto } from '@apps/hotels/src/modules/hotels/hotel.dto';

@Injectable()
export class HotelRepository extends Repository<Hotel> {
    constructor(private dataSource: DataSource) {
        super(Hotel, dataSource.createEntityManager());
    }

    public async getHotels(): Promise<Hotel[]> {
        return await this.find();
    }

    public async getHotelById(id: number): Promise<Hotel> {
        return await this.findOne({
            where: {
                hotel_id: id,
            },
        });
    }

    public async createHotel(createHotelDto: CreateHotelDto): Promise<Hotel> {
        const newHotel = this.create(createHotelDto);
        await this.save(newHotel);
        return newHotel;
    }

    public async updateHotel(previousHotel: Hotel, updateHotelDto: UpdateHotelDto): Promise<Hotel> {
        const updatedHotel = this.merge(previousHotel, updateHotelDto);
        await this.save(updatedHotel);
        return updatedHotel;
    }

    public async removeHotel(toRemoveHotel: Hotel): Promise<boolean> {
        await this.remove(toRemoveHotel);
        return true;
    }
}
