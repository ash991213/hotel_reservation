import { Module } from '@nestjs/common';

import { IHotelService } from '@apps/hotels/src/modules/hotel/adapter/hotel.adapter';
import { HotelController } from '@apps/hotels/src/modules/hotel/controller/hotel.controller';
import { HotelService } from '@apps/hotels/src/modules/hotel/service/hotel.service';
import { HotelTypeormModule } from '@libs/entity/hotel/hotel.typeorm.module';
import { DatabaseModule } from '@libs/modules/database/connection/database.module';

@Module({
    imports: [DatabaseModule, HotelTypeormModule],
    controllers: [HotelController],
    providers: [
        {
            provide: IHotelService,
            useClass: HotelService,
        },
    ],
})
export class HotelModule {}
