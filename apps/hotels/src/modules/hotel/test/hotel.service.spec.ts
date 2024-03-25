import { Test, TestingModule } from '@nestjs/testing';

import { Hotel } from '@libs/entity/hotel/hotel.entity';
import { HotelService } from '@apps/hotels/src/modules/hotel/hotel.service';
import { HotelRepository } from '@app/hotels/src/modules/hotel/hotel.repository';

import { ResImpl } from '@libs/utils/common/res/res.implement';
import { HOTEL_SELECT_FAILED } from '@libs/utils/common/const/error.const';

import { CreateHotelDto, UpdateHotelDto } from '@apps/hotels/src/modules/hotel/hotel.dto';

describe('HotelService', () => {
    let hotelService: HotelService;
    let hotelRepository: Partial<HotelRepository>;

    const hotelId = 1;
    const defaultHotelData = new Hotel();
    defaultHotelData.hotel_id = hotelId;
    defaultHotelData.name = 'New Hotel';
    defaultHotelData.address = 'New Address';
    defaultHotelData.location = 'New Location';
    defaultHotelData.rooms = [];
    const updateData: UpdateHotelDto = { name: 'Updated Hotel', address: 'Updated Address', location: 'Updated Location' };

    beforeEach(async () => {
        hotelRepository = {
            createHotel: jest.fn().mockResolvedValue(defaultHotelData),
            getHotelById: jest.fn().mockResolvedValue(defaultHotelData),
            updateHotel: jest.fn().mockImplementation((hotel, dto) => ({ ...hotel, ...dto })),
            deleteHotel: jest.fn().mockResolvedValue(true),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [HotelService, { provide: HotelRepository, useValue: hotelRepository }],
        }).compile();

        hotelService = module.get<HotelService>(HotelService);
    });

    describe('호텔 추가', () => {
        it('성공적으로 호텔을 추가한다.', async () => {
            const newHotel: CreateHotelDto = {
                name: 'New Hotel',
                address: 'New Address',
                location: 'New Location',
            };

            const hotel = await hotelService.createHotel(newHotel);

            expect(hotelRepository.createHotel).toHaveBeenCalledWith(newHotel);
            expect(hotel).toEqual(expect.objectContaining(newHotel));
        });
    });

    describe('호텔 조회', () => {
        it('성공적으로 호텔 정보를 조회한다.', async () => {
            const hotel = await hotelService.getHotelById(hotelId);

            expect(hotelRepository.getHotelById).toHaveBeenCalledWith(hotelId);
            expect(hotel).toEqual(
                expect.objectContaining({
                    hotel_id: hotelId,
                    name: 'New Hotel',
                    address: 'New Address',
                    location: 'New Location',
                }),
            );
        });

        it('존재하지 않는 호텔 ID로 조회 시 에러를 발생시킨다.', async () => {
            jest.spyOn(hotelRepository, 'getHotelById').mockRejectedValue(new ResImpl(HOTEL_SELECT_FAILED));
            await expect(hotelService.getHotelById(9999)).rejects.toEqual(new ResImpl(HOTEL_SELECT_FAILED));
        });
    });

    describe('호텔 업데이트', () => {
        it('성공적으로 호텔 정보를 업데이트한다.', async () => {
            const updatedHotel = await hotelService.updateHotel(hotelId, updateData);

            expect(hotelRepository.updateHotel).toHaveBeenCalledWith(expect.any(Hotel), updateData);
            expect(updatedHotel).toEqual(expect.objectContaining(updateData));
        });

        it('존재하지 않는 호텔 ID로 업데이트 시 에러를 발생시킨다.', async () => {
            jest.spyOn(hotelRepository, 'getHotelById').mockRejectedValue(new ResImpl(HOTEL_SELECT_FAILED));
            await expect(hotelService.updateHotel(9999, updateData)).rejects.toEqual(new ResImpl(HOTEL_SELECT_FAILED));
        });
    });

    describe('호텔 삭제', () => {
        it('성공적으로 호텔 정보를 삭제한다.', async () => {
            const isDeleted = await hotelService.deleteHotel(hotelId);

            expect(hotelRepository.deleteHotel).toHaveBeenCalledWith(hotelId);
            expect(isDeleted).toEqual(true);
        });

        it('존재하지 않는 호텔 ID로 삭제 시 에러를 발생시킨다.', async () => {
            jest.spyOn(hotelRepository, 'getHotelById').mockRejectedValue(new ResImpl(HOTEL_SELECT_FAILED));
            await expect(hotelService.deleteHotel(9999)).rejects.toEqual(new ResImpl(HOTEL_SELECT_FAILED));
        });
    });
});
