import { Module } from '@nestjs/common';

import { ILoggerService } from 'libs/modules/global/logger/adapter';
import { IEnvConfigService } from 'libs/modules/global/config/adapter';
import { ICacheService } from 'libs/modules/cache/adapter';
import { CacheService } from 'libs/modules/cache/service';
import { EnvConfigModule } from '../global/config/config.module';
import { LoggerModule } from '../global/logger/logger.module';

@Module({
    imports: [EnvConfigModule, LoggerModule],
    providers: [
        {
            provide: ICacheService,
            useFactory: async (configService: IEnvConfigService, logger: ILoggerService) => {
                const cacheService = new CacheService({ url: configService.REDIS_URL }, logger);
                await cacheService.connect();
                return cacheService;
            },
            inject: [IEnvConfigService, ILoggerService],
        },
    ],
    exports: [ICacheService],
})
export class CacheModule {}
