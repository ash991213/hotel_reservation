import { Module } from '@nestjs/common';
import { LoggerModule } from '@libs/modules/global/logger/logger.module';

import { IHotelService } from '@apps/hotels/src/modules/hotel/adapter/hotel.adapter';
import { HotelController } from '@apps/hotels/src/modules/hotel/controller/hotel.controller';
import { HotelService } from '@apps/hotels/src/modules/hotel/service/hotel.service';
import { HotelTypeormModule } from '@libs/entity/hotel/hotel.typeorm.module';
import { DatabaseModule } from '@libs/modules/database/connection/database.module';

@Module({
    imports: [LoggerModule, DatabaseModule, HotelTypeormModule],
    controllers: [HotelController],
    providers: [
        {
            provide: IHotelService,
            useClass: HotelService,
        },
    ],
})
export class HotelModule {}
