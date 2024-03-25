import { Module } from '@nestjs/common';

import { LoggerModule } from '@libs/modules/global/logger/logger.module';

import { HotelController } from '@apps/hotels/src/modules/hotels/hotel.controller';
import { IHotelService } from '@apps/hotels/src/modules/hotels/hotel.adapter';
import { HotelService } from '@apps/hotels/src/modules/hotels/hotel.service';
import { HotelRepository } from '@apps/hotels/src/modules/hotels/hotel.repository';

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
