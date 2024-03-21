import { Injectable } from '@nestjs/common';

import { ILoggerService } from '@libs/modules/global/logger/adapter';

import { DataSource, Repository } from 'typeorm';
import { Hotel } from '@libs/entity/hotel/hotel.entity';
import { CreateHotelDto, UpdateHotelDto } from '@apps/hotels/src/modules/hotel/hotel.dto';

@Injectable()
export class HotelRepository extends Repository<Hotel> {
    constructor(
        private readonly logger: ILoggerService,
        private dataSource: DataSource,
    ) {
        super(Hotel, dataSource.createEntityManager());
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

    public async deleteHotel(id: number): Promise<boolean> {
        const deleteResult = await this.delete(id);
        if (!deleteResult.affected) {
            throw new Error(`해당 호텔을 찾을 수 없습니다.`);
        }
        return true;
    }
}
