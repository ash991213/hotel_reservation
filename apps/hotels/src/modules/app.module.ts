import { Module, OnModuleInit } from '@nestjs/common';
import { HealthModule } from '@apps/hotels/src/modules/health/health.module';
import { HotelModule } from '@apps/hotels/src/modules/hotels/hotel.module';
import { LoggerModule } from '@libs/modules/global/logger/logger.module';
import { DatabaseModule } from '@libs/modules/database/connection/database.module';
import { CacheModule } from '@libs/modules/cache/cache.module';
import { EnvConfigModule } from '@libs/modules/global/config/config.module';

import { IHotelService } from '@apps/hotels/src/modules/hotels/hotel.adapter';
import { ICacheService } from '@libs/modules/cache/adapter';

@Module({
    imports: [HealthModule, LoggerModule, EnvConfigModule, DatabaseModule, CacheModule, HotelModule],
})
export class AppModule implements OnModuleInit {
    constructor(
        private readonly hotelService: IHotelService,
        private readonly cacheService: ICacheService,
    ) {}

    async onModuleInit() {
        try {
            const hotels = await this.hotelService.getHotels();
            hotels.forEach(async (hotel) => {
                await this.cacheService.set(`hotel:${hotel.hotel_id}`, JSON.stringify(hotel));
            });
        } catch (error) {
            console.log(error);
        }
    }
}
