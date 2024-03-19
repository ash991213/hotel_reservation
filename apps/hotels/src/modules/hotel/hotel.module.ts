import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '@libs/modules/global/logger/logger.module';

import { IHotelService } from '@apps/hotels/src/modules/hotel/adapter/hotel.adapter';
import { HotelController } from '@apps/hotels/src/modules/hotel/controller/hotel.controller';
import { HotelService } from '@apps/hotels/src/modules/hotel/service/hotel.service';
import { HotelRepository } from '@apps/hotels/src/modules/hotel/repository/hotel.repository';
import { Hotel } from '@libs/entity/hotel/hotel.entity';

@Module({
    imports: [LoggerModule, TypeOrmModule.forFeature([Hotel])],
    controllers: [HotelController],
    providers: [
        {
            provide: IHotelService,
            useClass: HotelService,
        },
        HotelRepository,
    ],
})
export class HotelModule {}
