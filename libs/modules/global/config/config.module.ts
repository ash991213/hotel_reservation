import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { IEnvConfigService } from 'libs/modules/global/config/adapter';
import { EnvConfigService } from 'libs/modules/global/config/service';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `libs/modules/global/config/env/${process.env.NODE_ENV === 'prod' ? '.env.prod' : process.env.NODE_ENV === 'test' ? '.env.test' : '.env.dev'}`,
            isGlobal: true,
            cache: true,
        }),
    ],
    providers: [
        {
            provide: IEnvConfigService,
            useClass: EnvConfigService,
        },
    ],
    exports: [IEnvConfigService],
})
export class EnvConfigModule {}
