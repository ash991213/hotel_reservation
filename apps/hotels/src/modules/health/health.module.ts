import { Module } from '@nestjs/common';
import { LoggerModule } from 'libs/modules/global/logger/logger.module';

import { IHealthService } from 'apps/hotels/src/modules/health/adapter/health.adapter';
import { HealthController } from 'apps/hotels/src/modules/health/controller/health.controller';
import { HealthService } from 'apps/hotels/src/modules/health/service/health.service';

@Module({
    imports: [LoggerModule],
    controllers: [HealthController],
    providers: [
        {
            provide: IHealthService,
            useClass: HealthService,
        },
    ],
})
export class HealthModule {}
