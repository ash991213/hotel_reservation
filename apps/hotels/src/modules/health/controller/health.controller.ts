import { Controller, Get } from '@nestjs/common';
import { ResImpl } from 'libs/utils/common/res/res.implement';

import { IHealthService } from 'apps/hotels/src/modules/health/adapter/health.adapter';

@Controller()
export class HealthController {
    constructor(private readonly healthService: IHealthService) {}

    @Get('/health')
    async healthCheck(): Promise<ResImpl> {
        return this.healthService.healthCheck();
    }
}
