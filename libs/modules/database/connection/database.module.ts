import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigModule } from '@libs/modules/global/config/config.module';

import { IDataBaseService } from '@libs/modules/database/adapter';
import { IEnvConfigService } from '@libs/modules/global/config/adapter';

import { DataBaseService } from '@libs/modules/database/service';

import { ConnectionName } from '@libs/modules/database/enum';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [EnvConfigModule],
            useFactory: async (envConfigService: IEnvConfigService) => {
                const { host, port, password, user } = envConfigService.database;
                return new DataBaseService().getDefaultConnection({
                    dbName: ConnectionName.DEV,
                    host,
                    password,
                    user,
                    port,
                    entities: [__dirname + '/../../../entity/models/**/*.entity.{js,ts}'],
                });
            },
            inject: [IEnvConfigService],
        }),
    ],
    providers: [
        {
            provide: IDataBaseService,
            useClass: DataBaseService,
        },
    ],
})
export class DatabaseModule {}
