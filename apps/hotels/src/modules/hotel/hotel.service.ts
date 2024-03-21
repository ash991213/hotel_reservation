import { Injectable } from '@nestjs/common';

import { IHotelService } from '@apps/hotels/src/modules/hotel/hotel.adapter';

import { HotelRepository } from '@libs/entity/hotel/hotel.repository';

import { Hotel } from '@libs/entity/hotel/hotel.entity';
import { CreateHotelDto, UpdateHotelDto } from '@apps/hotels/src/modules/hotel/hotel.dto';

import { ResImpl } from '@libs/utils/common/res/res.implement';
import { HOTEL_SELECT_FAILED, HOTEL_CREATE_FAILED, HOTEL_UPDATE_FAILED, HOTEL_DELETE_FAILED } from '@libs/utils/common/const/error.const';

@Injectable()
export class HotelService implements IHotelService {
    constructor(private readonly hotelRepository: HotelRepository) {}

    async getHotelById(id: number): Promise<Hotel> {
        try {
            return await this.hotelRepository.getHotelById(id);
        } catch (error) {
            throw new ResImpl(HOTEL_SELECT_FAILED);
        }
    }

    async createHotel(createHotelDto: CreateHotelDto): Promise<Hotel> {
        try {
            return await this.hotelRepository.createHotel(createHotelDto);
        } catch (error) {
            throw new ResImpl(HOTEL_CREATE_FAILED);
        }
    }

    async updateHotel(id: number, updateData: UpdateHotelDto): Promise<Hotel> {
        try {
            const previousHotel = await this.hotelRepository.getHotelById(id);
            if (!previousHotel) throw new ResImpl(HOTEL_SELECT_FAILED);
            return await this.hotelRepository.updateHotel(previousHotel, updateData);
        } catch (error) {
            if (error instanceof ResImpl && error.code === HOTEL_SELECT_FAILED.code) {
                throw error;
            }
            throw new ResImpl(HOTEL_UPDATE_FAILED);
        }
    }

    async deleteHotel(id: number): Promise<boolean> {
        try {
            return await this.hotelRepository.deleteHotel(id);
        } catch (error) {
            throw new ResImpl(HOTEL_DELETE_FAILED);
        }
    }
}