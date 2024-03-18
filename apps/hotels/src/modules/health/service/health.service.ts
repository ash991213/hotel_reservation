import { SUCCESS } from 'libs/utils/common/const/error.const';
import { Injectable } from '@nestjs/common';
import { name, version } from 'apps/hotels/package.json';

import { IHealthService } from 'apps/hotels/src/modules/health/adapter/health.adapter';
import { ResImpl } from 'libs/utils/common/res/res.implement';
import { ILoggerService } from 'libs/modules/global/logger/adapter';

@Injectable()
export class HealthService implements IHealthService {
    constructor(private readonly loggerService: ILoggerService) {}

    async healthCheck(): Promise<ResImpl> {
        const appName = `${name} - ${version} is running`;

        this.loggerService.log(appName);

        return new ResImpl({ ...SUCCESS });
    }
}
