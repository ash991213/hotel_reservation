import { Injectable } from '@nestjs/common';

import { IHotelService } from '@apps/hotels/src/modules/hotel/adapter/hotel.adapter';
import { ILoggerService } from '@libs/modules/global/logger/adapter';

import { HotelRepository } from '@apps/hotels/src/modules/hotel/repository/hotel.repository';

import { Hotel } from '@libs/entity/hotel/hotel.entity';
import { CreateHotelDto, UpdateHotelDto } from '@apps/hotels/src/modules/hotel/dto/hotel.req.dto';

@Injectable()
export class HotelService implements IHotelService {
    constructor(
        private readonly loggerService: ILoggerService,
        private readonly hotelRepository: HotelRepository,
    ) {}

    async getHotelById(id: number): Promise<Hotel> {
        this.loggerService.log(`${HotelService.name} - ${this.getHotelById.name} dto : ${JSON.stringify(id)}`);

        try {
            return await this.hotelRepository.getHotelById(id);
        } catch (error) {
            throw error;
        }
    }

    async createHotel(createHotelDto: CreateHotelDto): Promise<Hotel> {
        this.loggerService.log(`${HotelService.name} - ${this.createHotel.name} dto : ${JSON.stringify(createHotelDto)}`);

        try {
            return await this.hotelRepository.createHotel(createHotelDto);
        } catch (error) {
            throw error;
        }
    }

    async updateHotel(id: number, updateData: UpdateHotelDto): Promise<Hotel> {
        this.loggerService.log(`${HotelService.name} - ${this.updateHotel.name} dto : ${JSON.stringify(updateData)}`);

        try {
            const previousHotel = await this.hotelRepository.getHotelById(id);
            return await this.hotelRepository.updateHotel(previousHotel, updateData);
        } catch (error) {
            throw error;
        }
    }

    async deleteHotel(id: number): Promise<boolean> {
        this.loggerService.log(`${HotelService.name} - ${this.deleteHotel.name} dto : ${JSON.stringify(id)}`);

        try {
            return await this.hotelRepository.deleteHotel(id);
        } catch (error) {
            throw error;
        }
    }
}
