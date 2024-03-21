import { Module } from '@nestjs/common';
import { HealthModule } from '@apps/hotels/src/modules/health/health.module';
import { HotelModule } from '@apps/hotels/src/modules/hotel/hotel.module';
import { LoggerModule } from '@libs/modules/global/logger/logger.module';
import { DatabaseModule } from '@libs/modules/database/connection/database.module';
import { EnvConfigModule } from '@libs/modules/global/config/config.module';

@Module({
    imports: [HealthModule, LoggerModule, EnvConfigModule, DatabaseModule, HotelModule],
})
export class AppModule {}
