import { Test, TestingModule } from '@nestjs/testing';

import { HotelModule } from '@apps/hotels/src/modules/hotel/hotel.module';
import { HotelController } from '@apps/hotels/src/modules/hotel/controller/hotel.controller';
import { HotelService } from '@apps/hotels/src/modules/hotel/service/hotel.service';

describe('HotelModule', () => {
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [HotelModule],
        }).compile();
    });

    it('should be defined', () => {
        expect(module).toBeDefined();
    });

    it('should load HotelService and HotelController', () => {
        const hotelService = module.get<HotelService>(HotelService);
        const hotelController = module.get<HotelController>(HotelController);

        expect(hotelService).toBeDefined();
        expect(hotelController).toBeDefined();
    });
});
