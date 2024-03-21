import { Module } from '@nestjs/common';
import { LoggerModule } from '@libs/modules/global/logger/logger.module';

import { IHealthService } from '@apps/hotels/src/modules/health/health.adapter';
import { HealthController } from '@apps/hotels/src/modules/health/health.controller';
import { HealthService } from '@apps/hotels/src/modules/health/health.service';

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
