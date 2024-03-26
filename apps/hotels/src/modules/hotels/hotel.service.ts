import { Injectable } from '@nestjs/common';

import { IHotelService } from '@apps/hotels/src/modules/hotels/hotel.adapter';
import { ICacheService } from '@libs/modules/cache/adapter';

import { InjectRepository } from '@nestjs/typeorm';
import { HotelRepository } from '@app/hotels/src/modules/hotels/hotel.repository';

import { Hotel } from '@libs/entity/models/hotel/hotel.entity';
import { CreateHotelDto, UpdateHotelDto } from '@apps/hotels/src/modules/hotels/hotel.dto';

import { ResImpl } from '@libs/utils/common/res/res.implement';
import { HOTEL_SELECT_FAILED, HOTEL_CREATE_FAILED, HOTEL_UPDATE_FAILED, HOTEL_DELETE_FAILED } from '@libs/utils/common/const/error.const';

@Injectable()
export class HotelService implements IHotelService {
    constructor(
        @InjectRepository(HotelRepository)
        private readonly hotelRepository: HotelRepository,
        private readonly cacheService: ICacheService,
    ) {}

    public async getHotels(): Promise<Hotel[]> {
        try {
            return await this.hotelRepository.getHotels();
        } catch (error) {
            throw new ResImpl(HOTEL_SELECT_FAILED);
        }
    }

    public async getHotelById(id: number): Promise<Hotel> {
        try {
            const cacheKey = `hotel:${id}`;
            const cachedHotel: string = await this.cacheService.get(cacheKey);

            if (cachedHotel) {
                const hotel: Hotel = JSON.parse(cachedHotel);

                return hotel;
            } else {
                const hotel: Hotel = await this.hotelRepository.getHotelById(id);

                if (!hotel) {
                    throw new ResImpl(HOTEL_SELECT_FAILED);
                }

                await this.cacheService.set(cacheKey, JSON.stringify(hotel));
                return hotel;
            }
        } catch (error) {
            throw new ResImpl(HOTEL_SELECT_FAILED);
        }
    }

    public async createHotel(createHotelDto: CreateHotelDto): Promise<Hotel> {
        try {
            return await this.hotelRepository.createHotel(createHotelDto);
        } catch (error) {
            throw new ResImpl(HOTEL_CREATE_FAILED);
        }
    }

    public async updateHotel(id: number, updateHotel: UpdateHotelDto): Promise<Hotel> {
        try {
            const previousHotel = await this.hotelRepository.getHotelById(id);
            if (!previousHotel) throw new ResImpl(HOTEL_SELECT_FAILED);
            return await this.hotelRepository.updateHotel(previousHotel, updateHotel);
        } catch (error) {
            if (error instanceof ResImpl && error.code === HOTEL_SELECT_FAILED.code) {
                throw error;
            }
            throw new ResImpl(HOTEL_UPDATE_FAILED);
        }
    }

    public async removeHotel(id: number): Promise<boolean> {
        try {
            const toDeleteHotel = await this.hotelRepository.getHotelById(id);
            if (!toDeleteHotel) throw new ResImpl(HOTEL_SELECT_FAILED);
            return await this.hotelRepository.removeHotel(toDeleteHotel);
        } catch (error) {
            if (error instanceof ResImpl && error.code === HOTEL_SELECT_FAILED.code) {
                throw error;
            }
            throw new ResImpl(HOTEL_DELETE_FAILED);
        }
    }
}
