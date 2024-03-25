import { Test, TestingModule } from '@nestjs/testing';

import { HotelModule } from '@apps/hotels/src/modules/hotels/hotel.module';
import { HotelController } from '@apps/hotels/src/modules/hotels/hotel.controller';
import { IHotelService } from '@apps/hotels/src/modules/hotels/hotel.adapter';

describe('HotelModule', () => {
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [HotelModule],
        }).compile();
    });

    afterAll(async () => {
        await module.close();
    });

    it('should be defined', () => {
        expect(module).toBeDefined();
    });

    it('should load HotelService and HotelController', () => {
        const hotelService = module.get<IHotelService>(IHotelService);
        const hotelController = module.get<HotelController>(HotelController);

        expect(hotelService).toBeDefined();
        expect(hotelController).toBeDefined();
    });
});
