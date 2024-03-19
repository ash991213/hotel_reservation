import { Module } from '@nestjs/common';
import { EnvConfigModule } from '@libs/modules/global/config/config.module';

import { IEnvConfigService } from '@libs/modules/global/config/adapter';
import { ILoggerService } from '@libs/modules/global/logger/adapter';
import { LoggerService } from '@libs/modules/global/logger/service';

@Module({
    imports: [EnvConfigModule],
    providers: [
        {
            provide: ILoggerService,
            useFactory: (envConfigService: IEnvConfigService) => {
                const logger = new LoggerService();
                logger.initializeLogger(envConfigService.NODE_ENV);
                return logger;
            },
            inject: [IEnvConfigService],
        },
    ],
    exports: [ILoggerService],
})
export class LoggerModule {}
