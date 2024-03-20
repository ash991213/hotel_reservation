import { Injectable } from '@nestjs/common';

import { ILoggerService } from '@libs/modules/global/logger/adapter';

import { ResImpl } from '@libs/utils/common/res/res.implement';
import { DB_DELETE_FAILED, DB_INSERT_FAILED, DB_SELECT_FAILED, DB_UPDATE_FAILED } from '@libs/utils/common/const/error.const';

import { DataSource, Repository } from 'typeorm';
import { Hotel } from '@libs/entity/hotel/hotel.entity';
import { CreateHotelDto, UpdateHotelDto } from '@apps/hotels/src/modules/hotel/dto/hotel.req.dto';

@Injectable()
export class HotelRepository extends Repository<Hotel> {
    constructor(
        private readonly logger: ILoggerService,
        private dataSource: DataSource,
    ) {
        super(Hotel, dataSource.createEntityManager());
    }

    public async getHotelById(id: number): Promise<Hotel> {
        try {
            return await this.findOne({
                where: {
                    hotel_id: id,
                },
            });
        } catch (error) {
            this.logger.error(error.message, error.stack, this.getHotelById.name);
            throw new ResImpl(DB_SELECT_FAILED);
        }
    }

    public async createHotel(createHotelDto: CreateHotelDto): Promise<Hotel> {
        try {
            const newHotel = this.create(createHotelDto);
            await this.save(newHotel);
            return newHotel;
        } catch (error) {
            this.logger.error(error.message, error.stack, this.createHotel.name);
            throw new ResImpl(DB_INSERT_FAILED);
        }
    }

    public async updateHotel(previousHotel: Hotel, updateHotelDto: UpdateHotelDto): Promise<Hotel> {
        try {
            const updatedHotel = this.merge(previousHotel, updateHotelDto);

            await this.save(updatedHotel);

            return updatedHotel;
        } catch (error) {
            this.logger.error(error.message, error.stack, this.updateHotel.name);
            throw new ResImpl(DB_UPDATE_FAILED);
        }
    }

    public async deleteHotel(id: number): Promise<boolean> {
        try {
            const deleteResult = await this.delete(id);

            if (!deleteResult.affected) {
                throw new Error(`해당 호텔을 찾을 수 없습니다.`);
            }

            return true;
        } catch (error) {
            this.logger.error(error.message, error.stack, this.deleteHotel.name);
            throw new ResImpl(DB_DELETE_FAILED);
        }
    }
}
