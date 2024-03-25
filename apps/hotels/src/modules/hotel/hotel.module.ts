import { Module } from '@nestjs/common';

import { LoggerModule } from '@libs/modules/global/logger/logger.module';

import { HotelController } from '@apps/hotels/src/modules/hotel/hotel.controller';
import { IHotelService } from '@apps/hotels/src/modules/hotel/hotel.adapter';
import { HotelService } from '@apps/hotels/src/modules/hotel/hotel.service';
import { HotelRepository } from '@apps/hotels/src/modules/hotel/hotel.repository';

@Module({
    imports: [LoggerModule],
    controllers: [HotelController],
    providers: [
        {
            provide: IHotelService,
            useClass: HotelService,
        },
        HotelRepository,
    ],
    exports: [IHotelService],
})
export class HotelModule {}
