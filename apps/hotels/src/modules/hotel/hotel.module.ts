import { Module } from '@nestjs/common';

import { IHotelService } from '@apps/hotels/src/modules/hotel/hotel.adapter';
import { HotelController } from '@apps/hotels/src/modules/hotel/hotel.controller';
import { HotelService } from '@apps/hotels/src/modules/hotel/hotel.service';
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
