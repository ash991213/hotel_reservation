import { Test, TestingModule } from '@nestjs/testing';

import { Hotel } from '@libs/entity/models/hotel/hotel.entity';
import { HotelController } from '@apps/hotels/src/modules/hotel/hotel.controller';
import { IHotelService } from '@apps/hotels/src/modules/hotel/hotel.adapter';

import { CreateHotelDto, UpdateHotelDto } from '@apps/hotels/src/modules/hotel/hotel.dto';
import { ResImpl } from '@libs/utils/common/res/res.implement';
import { HOTEL_SELECT_FAILED, SUCCESS } from '@libs/utils/common/const/error.const';

describe('HotelController', () => {
    let hotelController: HotelController;
    let hotelService: Partial<IHotelService>;

    const hotelId = 1;
    const defaultHotelData = new Hotel();
    defaultHotelData.hotel_id = hotelId;
    defaultHotelData.name = 'New Hotel';
    defaultHotelData.address = 'New Address';
    defaultHotelData.location = 'New Location';
    defaultHotelData.rooms = [];
    const updateData: UpdateHotelDto = { name: 'Updated Hotel', address: 'Updated Address', location: 'Updated Location' };

    beforeEach(async () => {
        hotelService = {
            getHotelById: jest.fn().mockResolvedValue(defaultHotelData),
            createHotel: jest.fn().mockResolvedValue(defaultHotelData),
            updateHotel: jest.fn().mockImplementation((hotel_id, dto) => {
                if (hotel_id > hotelId) throw new ResImpl(HOTEL_SELECT_FAILED);
                return { ...defaultHotelData, ...dto };
            }),
            deleteHotel: jest.fn().mockImplementation((hotel_id) => {
                if (hotel_id > hotelId) throw new ResImpl(HOTEL_SELECT_FAILED);
                return undefined;
            }),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [HotelController],
            providers: [
                {
                    provide: IHotelService,
                    useValue: hotelService,
                },
            ],
        }).compile();

        hotelController = module.get<HotelController>(HotelController);
    });

    describe('호텔 추가', () => {
        it('성공적으로 호텔을 추가한다.', async () => {
            const newHotel: CreateHotelDto = {
                name: 'New Hotel',
                address: 'New Address',
                location: 'New Location',
            };

            const result = new ResImpl({ ...SUCCESS, data: { ...newHotel, rooms: [], hotel_id: hotelId } });

            expect(await hotelController.createHotel(newHotel)).toEqual(result);
            expect(hotelService.createHotel).toHaveBeenCalledWith(newHotel);
        });
    });

    describe('호텔 조회', () => {
        it('성공적으로 호텔 정보를 조회한다.', async () => {
            const result = new ResImpl({ ...SUCCESS, data: defaultHotelData });

            expect(await hotelController.getHotelById(hotelId)).toEqual(result);
            expect(hotelService.getHotelById).toHaveBeenCalledWith(hotelId);
        });

        it('존재하지 않는 호텔 ID로 조회 시 에러를 발생시킨다.', async () => {
            jest.spyOn(hotelService, 'getHotelById').mockRejectedValue(new ResImpl(HOTEL_SELECT_FAILED));
            await expect(hotelController.getHotelById(9999)).rejects.toEqual(new ResImpl(HOTEL_SELECT_FAILED));
        });
    });

    describe('호텔 업데이트', () => {
        it('성공적으로 호텔 정보를 업데이트한다.', async () => {
            const result = new ResImpl({ ...SUCCESS, data: { ...updateData, hotel_id: hotelId, rooms: [] } });

            expect(await hotelController.updateHotel(hotelId, updateData)).toEqual(result);
            expect(hotelService.updateHotel).toHaveBeenCalledWith(hotelId, updateData);
        });

        it('존재하지 않는 호텔 ID로 업데이트 시 에러를 발생시킨다.', async () => {
            jest.spyOn(hotelService, 'getHotelById').mockRejectedValue(new ResImpl(HOTEL_SELECT_FAILED));
            await expect(hotelController.updateHotel(9999, updateData)).rejects.toEqual(new ResImpl(HOTEL_SELECT_FAILED));
        });
    });

    describe('호텔 삭제', () => {
        it('성공적으로 호텔 정보를 삭제한다.', async () => {
            jest.spyOn(hotelService, 'deleteHotel').mockResolvedValue(undefined);
            const result = new ResImpl({ ...SUCCESS, data: undefined });

            expect(await hotelController.deleteHotel(hotelId)).toEqual(result);
            expect(hotelService.deleteHotel).toHaveBeenCalledWith(hotelId);
        });

        it('존재하지 않는 호텔 ID로 삭제 시 에러를 발생시킨다.', async () => {
            jest.spyOn(hotelService, 'getHotelById').mockRejectedValue(new ResImpl(HOTEL_SELECT_FAILED));
            await expect(hotelController.deleteHotel(9999)).rejects.toEqual(new ResImpl(HOTEL_SELECT_FAILED));
        });
    });
});
